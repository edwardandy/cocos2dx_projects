/**
 * Created by Edward on 13-12-21.
 */
var TabList = cc.Layer.extend({
    _direction:Direction.HORIZONTAL,
    _point:'',
    _size:'',

    _quantity:0,
    _space:0,
    itemCls:null,
    skinCls:null,
    _list:null,
    _container:null,
    _instance:null,

    _data:null,
    _currentItem:null,

    ctor:function(cls,skinCls, quantity, space, direction){
        this._super();

        this.setTouchEnabled(true);
        this.setTouchMode(cc.TOUCH_ONE_BY_ONE);

        this._space				= space;
        this.itemCls			    = cls;
        this._quantity           = quantity;
        if(direction)
            this.direction      = direction;
        this.skinCls        = skinCls;
        this._instance           = new cls();
        this._instance.retain();
        this.initlize();
    },

    getCurrentItem:function(){
        return this._currentItem;
    },
    setCurrentItem:function(value){
        if(this._currentItem){
            this._currentItem.onUnselect();
        }
        this._currentItem = value;
        this._currentItem.onSelect();
        this.refreshButtonDepth(this._currentItem);
    },
    /**
     * 查找ITEM
     */
    setCurrentItemByValue:function(searchField,filedValue){
        var item;
        var len = this._list.length;
        var i;
        for (i = 0; i < len;i++ ){
            item                = this._list[i];
            if(item.getData() && item.getData()[searchField] == filedValue){
                this.setCurrentItem(item);
                break;
            }
        }
    },
    /**
     * 设置列表数据
     */
    setData:function(value){
        this._data	= value;
        this.refreshListData();
    },
    getData:function(){
        return this._data;
    },
    refreshListData:function(){
        var i;
        var item;
        for (i = 0; i < this._quantity; i++)
        {
            item      = this._list[i];
            item.setData(this._data[i]);
            /*if(item.getData()){
                item.addEventListener(MouseEvent.CLICK,onClick);
                item.addEventListener(MouseEvent.MOUSE_OVER,onMouseOver);
                item.addEventListener(MouseEvent.MOUSE_OUT,onMouseOut);
            }else{
                item.removeEventListener(MouseEvent.CLICK,onClick);
                item.removeEventListener(MouseEvent.MOUSE_OVER,onMouseOver);
                item.removeEventListener(MouseEvent.MOUSE_OUT,onMouseOut);
            }*/
        }
    },
    onTouchBegan:function(touch,event){
        return true;
    },
    onTouchMoved:function(touch,event){

    },
    onTouchEnded:function(touch,event){

    },
    refreshButtonDepth:function(value){
        var len = this._list.length;
        for(var i=0; i<len; ++i)
        {
            this._list[i].setZOrder(0);
        }
        value.setZOrder(1);
    },
    initlize:function(){
        this._list				= [];
        if(this._container)
            this._container.release();
        this._container			= cc.Node.create();
        this._container.retain();
        this.addChild(this._container);
        this.refreshListDisplayItems();
    },
    /**
     * 刷新显示对象中的元素
     */
    refreshListDisplayItems:function(){
        var i
        var item;

        for (i = 0; i < this._quantity; i++)
        {
            item		 = new this.itemCls();
            this._container.addChild(item);
            if(this.skinCls != null){
                item.setSkin(new this.skinCls);
            }
            item[this._point]((item.getContentSize()[this._size] + this._space) * i);
            this._list.push(item);
            item.retain();
        }
    },
    /**
     * 设置方向
     */
    setDirection:function(value){
        if(this._direction!=value)
        {
            this._direction	= value;

            if(this._direction == Direction.HORIZONTAL)
            {
                this._point			= 'getPositionX';
                this._size			= 'width';
            }else if(this._direction == Direction.VERTICAL)
            {
                this._point			= 'getPositionY';
                this._size			= 'height';
            }
        }
    },
    /**
     * 被回收前需要手动释放拥有的其他对象的引用
     */
    dispose:function(){
        this.itemCls = null;
        this.skinCls = null;

        var len = this._list.length;
        for(var i=0; i<len; ++i)
        {
            this._list[i].release();
            this._list[i] = null;
        }
        this._list = null;

        if(this._container)
            this._container.release();
        this._container = null;

        if(this._instance)
            this._instance.release();
        this._instance = null;

        this._data = null;

        if(this._currentItem)
            this._currentItem.release();
        this._currentItem = null;
    }
});