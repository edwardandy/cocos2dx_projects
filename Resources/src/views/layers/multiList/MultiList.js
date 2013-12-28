/**
 * Created by Administrator on 13-12-16.
 */
var MultiList = cc.Layer.extend({
    itemClazz:null,
    skinClazz:null,
    row:0,
    col:0,
    rowSpace:0,
    colSpace:0,
    _direction:Direction.HORIZONTAL,

    mContainer:null,
    mList:null,

    _data:null,
    _currentPoint:0,
    _index:0,
    _mask:null,
    itemInstance:null,
    ctor:function(clazz,skinClazz, row, col, rowSpace,colSpace,direction){
        this._super();

        this.itemClazz 		= clazz;
        this.skinClazz 		= skinClazz;
        this.row 			= row;
        this.col 			= col;
        this.rowSpace 		= rowSpace;
        this.colSpace 		= colSpace;
        this.direction		= direction? direction : Direction.HORIZONTAL;
        this.itemInstance	= new clazz();
        this.itemInstance.retain();

        if(skinClazz != null)
        {
            this.itemInstance.setSkin(new skinClazz());
        }

        //容器
        this.mContainer			= cc.Layer.create();
        this.mContainer.retain();
        this.addChild(this.mContainer);


        //遮罩层
        this._mask				= cc.DrawNode.create();
        this._mask.retain();

        //this.mContainer.stencil 	= this._mask;

        this.make();
        //this.drawMask();
    },
    /**
     * 绘制遮罩
     */
    drawMask:function(drawX, drawY, drawWidth, drawHeight){
        var triangle = [cc.p(-100, -100),cc.p(100, -100), cc.p(0, 100)];

        var green = cc.c4f(0, 1, 0, 1);
        this._mask.drawPoly(triangle, green, 3, green);

    },
    /**
     * 刷新显示对象中的元素
     */
    make:function(){
        this.mList = [];

        var len_1;
        var len_2;
        if(this._direction == Direction.HORIZONTAL){
            len_1 = this.row;
            len_2 = this.col;
        }
        else
        {
            len_1 = this.col;
            len_2 = this.row;
        }

        var item;
        for (var i = 0; i < len_1 + 1; i++)
        {
            if(this.mList[i] == null)
                this.mList[i] = [];
            for (var j = 0; j < len_2; j++)
            {
                item		= this.getNewItem();
                item.setItemId(-1);
                item.retain();
                this.mList[i].push(item);
            }
        }
    },
    /**
     * 获取新的子项
     */
    getNewItem:function(){
        var item = new this.itemClazz();
        this.mContainer.addChild(item);
        if(this.skinClazz != null)
        {
            item.setSkin(new this.skinClazz());
        }
        return item;
    },
    /**
     * 设置滚动方向
     */
    setDirection:function(dir){
        this._direction = dir;
    },
    /**
     * 获取列表数据
     */
    getData:function(){
        return this._data;
    },
    /**
     * 设置列表数据
     */
    setData:function(value){
        this._data 			= value;
        this._currentPoint   = 0;
        this._index		= 0;
        this.fill(true);
        cc.log("MultiList setData:"+value);
    },
    /**
     * 执行滚动时的数据更新
     */
    fill:function(isAll){
        var i
        var j;
        var len			= this.mList.length;
        var item;
        var isNeed;
        var needList	= [];
        var outList	= [];
        var rowNum = -1;
        cc.log("MultiList fill len:"+len+" isAll:"+isAll);
        if(isAll){
            for (i = 0; i < len; i++)
            {
                cc.log("MultiList fill i:"+i);
                rowNum = Math.floor((this._currentPoint + (i * this.getItemSize())) / this.getItemSize());
                for (j = 0; j < this.mList[i].length; j++)
                {
                    cc.log("MultiList fill j:"+j+" _direction:"+this._direction);
                    item							= this.mList[i][j];
                    if(this._direction == Direction.HORIZONTAL){

                        cc.log("MultiList fill rowNum:"+rowNum+" this.col:"+this.col);
                        item.setItemId(rowNum * this.col + j);
                        item.setData(this._data[item.getItemId()-this.col]);
                        cc.log("MultiList fill itemid:"+(item.getItemId())+" itemDataIdx:"+(item.getItemId()-this.col));
                        item.setPosition(cc.p(j * (this.itemInstance.getContentSize().width + this.colSpace)
                        ,(rowNum * this.getItemSize())-this._currentPoint - this.getItemSize()));
                    }
                    else
                    {
                        item.setItemId(rowNum * this.row + j);
                        item.setData(this._data[item.getItemId()-this.row]);
                        item.setPosition(cc.p((rowNum * this.getItemSize())-this._currentPoint - this.getItemSize()
                            ,j * (this.itemInstance.getContentSize().height + this.rowSpace)));
                    }
                }
            }
        }
        else
        {
            for (i = 0; i < len; i++)
            {
                needList.push(Math.ceil((this._currentPoint + (i* this.getItemSize())) / this.getItemSize()));
            }
            //找到显示区域外的子项
            for (i = 0; i < len; i++)
            {
                if(this._direction == Direction.HORIZONTAL){
                    rowNum		= Math.floor(this.mList[i][0].getItemId() / this.col);
                }
                else
                {
                    rowNum		= Math.floor(this.mList[i][0].getItemId() / this.row);
                }
                isNeed		= false;
                for (j = 0; j < needList.length; j++)
                {
                    if (rowNum == needList[j])
                    {
                        isNeed	= true;
                        needList.splice(j, 1);
                        break;
                    }
                }
                if (!isNeed)
                {
                    outList.push(this.mList[i]);
                }else
                {
                    var llen = this.mList[i].length;
                    for (var k = 0; k < llen; k++)
                    {
                        item 	= this.mList[i][k];

                        if(this._direction == Direction.HORIZONTAL){

                            item.setPositionY((Math.floor(item.getItemId() / this.col) * this.getItemSize())
                                - this._currentPoint - this.getItemSize());
                        }
                        else
                        {
                            item.setPositionX((Math.floor(item.getItemId() / this.row) * this.getItemSize())
                                - this._currentPoint - this.getItemSize());
                        }
                    }
                }
            }
            //列表外的子项修正到显示区域内
            len	= outList.length;
            var temp;
            var tlen;
            for (i = 0; i < len; i++)
            {
                temp 	= outList[i];
                rowNum 	= needList[i];
                for (j = 0, tlen = temp.length; j < tlen; j++)
                {
                    item				= temp[j];

                    if(this._direction == Direction.HORIZONTAL){
                        item.setItemId(rowNum * this.col + j);
                        item.setData(this._data[item.getItemId()-this.col]);
                        item.setPositionY((Math.floor(item.getItemId() / this.col) * this.getItemSize())
                            - this._currentPoint - this.getItemSize());
                    }
                    else
                    {
                        item.setItemId(rowNum * this.row + j);
                        item.setData(this._data[item.getItemId()-this.row]);
                        item.setPositionX((Math.floor(item.getItemId() / this.row) * this.getItemSize())
                            - this._currentPoint - this.getItemSize());
                    }
                }
            }
        }
    },
    /**
     * 行或列的间距
     */
    getItemSize:function(){
        if(this._direction == Direction.HORIZONTAL)
        {
            cc.log("MultiList getItemSize contentWidth:"+this.itemInstance.getContentSize().width
                +" contentHeight:"+this.itemInstance.getContentSize().height);
            return this.itemInstance.getContentSize().height + this.rowSpace;
        }
        return this.itemInstance.getContentSize().width + this.colSpace;
    },
    convertY:function(srcY){
        var height = (this.itemInstance.getContentSize().height + this.rowSpace)*this.row
                - this.rowSpace;
        return height - srcY - this.itemInstance.getContentSize().height
                + this.itemInstance.getAnchorPointInPoints().y;
    },
    convertX:function(srcX){
        return srcX + this.itemInstance.getAnchorPointInPoints().x;
    },
    /**
     * 获取行列的索引
     */
    getIndex:function(){
        return this._index;
    },
    setIndex:function(value){
        if(value <=0)
        {
            value = 0;
        }
        else if(value >= this.getTotalIndex())
        {
            value = this.getTotalIndex();
        }
        if(Math.floor(this._index - value) >= 5)
        {
            if(this._index < value)
            {
                this.setCurrentPoint((value - 5) * this.getItemSize());
            }
            else
            {
                this.setCurrentPoint((value + 5) * this.getItemSize());
            }
        }
        this._index = value;
        //Tweener.addTween(this,{time:.5,currentPoint:index * itemSize,transition:Equations.easeOutExpo});
    },
    /**
     * 总索引数
     */
    getTotalIndex:function(){
        var num;
        if(this._direction == Direction.HORIZONTAL)
        {
            num = Math.ceil(this.data.length / this.col) - this.row;
        }
        else if(this._direction == Direction.VERTICAL)
        {
            num = Math.ceil(this.data.length / this.row) - this.col;
        }

        return num <0?0:num;
    },
    /**
     * 获取列表位置
     */
    getCurrentPoint:function(){
        return this._currentPoint;
    },
    /**
     * 设置列表位置
     */
    setCurrentPoint:function(value){
        this._currentPoint = value;
        if(this._currentPoint >= this.getTotalIndex() * this.getItemSize())
        {
            this._currentPoint 	= this.getTotalIndex() * this.getItemSize();
        }else if(this._currentPoint<=0){
            this._currentPoint = 0;
        }
        this.fill();
    },
    /**
     * 单页的行或列数
     */
    getPageNum:function(){
        if(this._direction == Direction.HORIZONTAL)
        {
            return this.row;
        }
        return this.col;
    },
    // --------------------------------------------------------
    // -------------------- 对数据的查询操作 --------------------
    // --------------------------------------------------------
    /**
     * 查找ITEM
     */
    searchItem:function(searchField,filedValue){
        var item;
        var len = this.mList.length;
        var i;
        for (i = 0; i < len;i++ ){
            var lenj = this.mList[i].length;
            for (var j = 0 ; j < lenj; j++)
            {
                item                = this.mList[i][j];
                if(item.getData() && item.getData()[searchField] == filedValue){
                    return item;
                }
            }
        }
        return null;
    },
    /**
     * update single item
     */
    updateItem:function(searchField,filedValue,value){
        var item = this.searchItem(searchField,filedValue);
        if(item){
            item.setData(value);
        }
        this.updateItemData(searchField,filedValue,value);
    },
    /**
     *  查找数据池里面的数据
     */
    searchItemData:function(searchField,filedValue){
        var o;
        var len = this.data.length;
        var i;
        for (i = 0; i < len;i++ ){
            o = this.data[i];
            if(o && o[searchField] == filedValue){
                return o;
            }
        }
        return null;
    },
    /**
     * 执行所有ITEM的update方法
     */
    updateItems:function(object){
        var item;
        var len = this.mList.length;
        var i;
        for (i = 0; i < len;i++ ){
            var lenj = this.mList[i].length
            for (var j = 0 ; j < lenj; j++)
            {
                item                = this.mList[i][j];
                if(item.data){
                    item.updateObject(object);
                }
            }
        }
    },
    /**
     * 只更新数据池里的数据
     */
    updateItemData:function(searchField,filedValue,value){
        var o;
        var len = this.data.length;
        var i;
        for (i = 0; i < len;i++ ){
            o = this.data[i];
            if(o && o[searchField] == filedValue){
                this.data[i] = value;
                break;
            }
        }
    }
});