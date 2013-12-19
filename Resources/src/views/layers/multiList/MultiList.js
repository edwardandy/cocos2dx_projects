/**
 * Created by Administrator on 13-12-16.
 */
var CustomTableViewCell = cc.TableViewCell.extend({
    draw:function (ctx) {
        this._super(ctx);
    }
});

var MultiList = cc.Node.extend({
    itemClazz:null,
    skinClazz:null,
    row:0,
    col:0,
    rowSpace:0,
    colSpace:0,
    _direction:cc.SCROLLVIEW_DIRECTION_HORIZONTAL,
    itemInstance:null,

    _data:[],
    _tableView:null,
    _maxIndex:0,
    _index:0,
    init:function(itemClazz,skinClazz,row,col,rowSpace,colSpace,direction){
        if(!this._super())
            return;
        cc.log("startInitMultiList");
        this.itemClazz = itemClazz;
        this.skinClazz = skinClazz;
        this.row = row;
        this.col = col;
        this.rowSpace = rowSpace;
        this.colSpace = colSpace;
        this._direction = (null == direction)?cc.SCROLLVIEW_DIRECTION_HORIZONTAL:direction;
        if(skinClazz)
            this.itemInstance = new itemClazz(new skinClazz);

        this.setAnchorPoint(cc.p(0,0));

        var gridSize = this.itemInstance.getContentSize();
        cc.log("gridSize:"+gridSize.width +" height:"+gridSize.height);
        this._tableView = cc.TableView.create(this, cc.size(this.col*gridSize.width+(this.col-1)*this.colSpace
            , this.row*gridSize.height+(this.row-1)*this.rowSpace));
        this._tableView.retain();
        this._tableView.setDirection(this._direction);
        this._tableView.setPosition(cc.p(0,0));
        this._tableView.setDelegate(this);
        this.addChild(this._tableView,0,1);
        this._tableView.reloadData();
        cc.log("endInitMultiList");
    },
    scrollViewDidScroll:function (view) {
    },
    scrollViewDidZoom:function (view) {
    },
    tableCellTouched:function (table, cell) {
        cc.log("cell touched at index: " + cell.getIdx());
    },
    tableCellSizeForIndex:function (table, idx) {
        var len = this._data.length;
        var gridSize = this.itemInstance.getContentSize();
        var width = gridSize.width + this.colSpace;
        var height = gridSize.height + this.rowSpace;

        if(cc.SCROLLVIEW_DIRECTION_HORIZONTAL = this._direction)
        {
            if(idx >= ((len/this.col)-1)*this.col)
            {
                height = gridSize.height;
            }
        }
        else
        {
            if(idx >= ((len/this.row)-1)*this.row)
            {
                width = gridSize.width;
            }
        }
        cc.log("tableCellSizeForIndex: width "+width+" height "+height);
        return cc.size(width, height);
    },
    tableCellAtIndex:function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var label;
        if (!cell) {
            cell = new this.itemClazz(new this.skinClazz);
            //cell = new CustomTableViewCell;
        }
        cell.setData(this._data[idx]);
        cc.log("tableCellAtIndex"+cell.toString());
        return cell;
    },
    numberOfCellsInTableView:function (table) {
        //cc.log("numberOfCellsInTableView "+this._data.length);
        return this._data.length;
    },
    setData:function(data){
        if(data)
        {
            this._data = data;
            this.updateData();
            var scrollView = this.getChildByTag(1);
            if(scrollView)
                scrollView.reloadData();
        }
    },
    getData:function(){
        return this._data;
    },
    updateData:function(){
        if(cc.SCROLLVIEW_DIRECTION_HORIZONTAL = this._direction)
            this._maxIndex  = (this._data.length/this.col)-this.row;
        else
            this._maxIndex  = (this._data.length/this.row)-this.col;

        if(this._index>this._maxIndex)
            this.setIndex(this._maxIndex,false,0);
    },
    getIndex:function(){
        return this._index;
    },
    setIndex:function(idx,bAnim,dur){
        if(idx<0)
            idx = 0;
        else if(idx>this._maxIndex)
            idx = this._maxIndex;
        this._index = idx;

        var offX = 0;
        var offY = 0;
        if(cc.SCROLLVIEW_DIRECTION_HORIZONTAL = this._direction)
            offY = -(this.itemInstance.height + this.rowSpace)*idx;
        else
            offX = -(this.itemInstance.width + this.colSpace)*idx;
        var offPt = cc.p(offX,offY);
        if(bAnim)
        {
            if(dur>0)
                this._tableView.setContentOffsetInDuration(offPt,dur);
            else
                this._tableView.setContentOffset(offPt,true);
        }
        else
            this._tableView.setContentOffset(offPt,false);
    },
    getPageNum:function(){
        if(cc.SCROLLVIEW_DIRECTION_HORIZONTAL = this._direction)
            return this.row;
        else
            return this.col;
    },
    searchItem:function(searchField,filedValue){
        var len = this._data.length;
        for(var i=0;i<len;++i)
        {
            var cell = this._tableView.cellAtIndex(i);
            if(cell && cell.getData() && filedValue == cell.getData()[searchField])
                return cell;
        }
        return null;
    },
    updateItem:function(searchField,filedValue,value){
        var item = this.searchItem(searchField,filedValue);
        if(item){
            item.data = value;
        }
        this.updateItemData(searchField,filedValue,value);
    },
    searchItemData:function(searchField,filedValue){
        var len = this._data.length;
        for(var i=0;i<len;++i)
        {
            var o = this._data[i];
            if(o && filedValue == o[searchField])
               return o;
        }
        return null;
    },
    updateItems:function(object){
        var len = this._data.length;
        for(var i=0;i<len;++i)
        {
            var cell = this._tableView.cellAtIndex(i);
            if(cell)
                cell.updateOutData(object);
        }
    },
    updateItemData:function(searchField,filedValue,value){
        var len = this._data.length;
        for(var i=0;i<len;++i)
        {
            var o = this._data[i];
            if(o && filedValue == o[searchField])
                o[searchField] = value;
        }
    }
});