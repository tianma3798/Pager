/// <reference path="../../JS/jquery-1.8.2.js" />

/*
* 自定义 分页控件 url 传参，后台刷新模式
*/

(function ($) {
    //分页条控件
    var PageBar = function (elem, opts) {
        var _this = this;
        //默认值
        var defaults = {
            pageIndex: 1,//当前页索引
            recordCount: 1,//列表项总数
            pageSize: 5,//每页数据量
            pageCount: 10,//总页数
            numberCount: 5,//显示按钮个
            showGoBtn: true,//是否显示跳转按钮
            submitEvent: function () {//提交事件
                this.tip('分页控件，没有注册提交事件');
            },
            async: false,//指示当前控件是否 
            tip: function (str) {//内容提示
                alert(str);
            }
        }
      
        _this.opts = $.extend({}, defaults, opts);
        _this.elem = elem;
        //计算 总页数

        _this.opts.pageCount = Math.ceil(opts.recordCount / opts.pageSize);
    }
    //方法注册
    PageBar.prototype = {
        //初始化---后台刷新模式
        init: function () {
            var opts = this.opts;
            var elem = this.elem;
            //左侧数字按钮
            this.getLeftNumberBtn();

            //右侧跳转按钮
            if (opts.showGoBtn) {
                this.getRightBtn();
            }
            elem.append(getDivByClass('clear'));

            //样式
            var width = elem.find('.pageBar_Number').width()
            + elem.find('.pageBar_Go').width();
            elem.width(width);

            //设定当前页
            this.setHot(opts.pageIndex);
        },
        //产生右侧按钮
        getRightBtn: function () {
            var pageBar_Go = getDivByClass('pageBar_Go');
            var title = getSpanByClass('title');
            title.text('跳转到:');
            pageBar_Go.append(title);
            var text = getSpanByClass('text');
            text.append('<input type="text" class="goNumberValue"/>');
            pageBar_Go.append(text);

            var goBtn = getSpanByClass('goToNumber');
            goBtn.text('go');
            goBtn.bind('click', { thisObj: this }, this.goClick);
            pageBar_Go.append(goBtn);

            this.elem.append(pageBar_Go);
        },
        //go按钮事件
        goClick: function (e) {
            var _this = e.data.thisObj;
            var elem = _this.elem;
            var opts = _this.opts;
            //1.获取数字
            var txtBox = elem.find('.goNumberValue');
            var current = txtBox.val();
            var number = parseInt(current);
            if (isNaN(number)) {
                txtBox.val('');
                txtBox.focus();
                opts.tip('亲,输入的不是数字');
            } else {
                //上限、下线 判断
                if (number < 1) {
                    opts.tip('亲，已经是第1页了');
                    return false;
                } else if (number > opts.pageCount) {
                    opts.tip('亲，筛选结果总共' + opts.pageCount + '页');
                    txtBox.focus();
                    txtBox.val('');
                    return false;
                }

                if (opts.async) {

                } else {
                    //判断要跳转页是否是当前页
                    if (_this.getCurrentNumber() == number)
                        return false;
                    elem.attr('pageindex', number);
                    opts.submitEvent();
                }
            }
        },
        //更多显示控制
        moreGroupShow: function () {
            var elem = this.elem;
            var opts = this.opts;
            //1.当前组有value=1 按钮
            if (elem.find('.number[data-value=1]').length > 0) {
                elem.find('.moreLeft').hide();
            } else {
                elem.find('.moreLeft').show();
            }
            //2.当前组有value=opts.pageCount
            if (elem.find('.number[data-value=' + opts.pageCount + ']').length > 0) {
                elem.find('.moreRight').hide();
            } else {
                elem.find('.moreRight').show();
            }
        },
        //产生左侧按钮
        getLeftNumberBtn: function () {
            var _this = this;
            var elem = _this.elem;
            var opts = _this.opts;

            var pageBar_Number = getDivByClass('pageBar_Number');
            //左移动按钮
            var arrowLeft = $('<span class="arrowLeft"/>');
            arrowLeft.append('<em class="arrow-left"/>');
            arrowLeft.bind('click', { thisObj: this }, _this.goToLeft);
            pageBar_Number.append(arrowLeft);
            //更多...
            var moreLeft = $('<span class="moreLeft"/>');
            moreLeft.text('...');
            moreLeft.bind('click', { thisObj: this }, _this.goToLeft);

            pageBar_Number.append(moreLeft);

            //中间数字
            this.generageNumberBtn(pageBar_Number);
            //更多...
            var moreRight = $('<span class="moreRight"/>');
            moreRight.text('...');
            moreRight.bind('click', { thisObj: this }, _this.goToRight);

            pageBar_Number.append(moreRight);

            //右移动按钮
            var arrowRight = $('<span class="arrowRight" />');
            arrowRight.append('<em class="arrow-right"/>');
            arrowRight.bind('click', { thisObj: this }, _this.goToRight);
            pageBar_Number.append(arrowRight);

            pageBar_Number.append(getClear());
            _this.elem.append(pageBar_Number);

            //更多显示控制
            _this.moreGroupShow();
        },
        //指定活动页
        setHot: function (number) {
            if (this.opts.async) {

            } else {
                this.elem.attr('pageindex', number);
                var curNumber = this.elem.find('.number[data-value=' + number + ']');
                curNumber.addClass('Hot');

            }
        },
        //产生数字按钮
        generageNumberBtn: function (pageBar_Number) {
            var opts = this.opts;
            var startNumber = opts.pageIndex - 1;

            startNumber = (Math.floor(startNumber / opts.numberCount) * opts.numberCount) + 1;

            var stopNumber = opts.numberCount + startNumber;

            stopNumber = stopNumber > opts.pageCount ? opts.pageCount + 1 : stopNumber;
            for (var i = startNumber; i < stopNumber; i++) {
                var number = getSpanByClass('number');
                if (i > opts.pageCount) {

                } else {
                    number.text(i).attr('data-value', i);
                    number.bind('click', { thisObj: this }, eventData.numberClick);
                }
                pageBar_Number.append(number);
            }
        },
        //上一页
        goToLeft: function (e) {
            var _this = e.data.thisObj;
            var current = _this.getCurrentNumber();
            current -= 1;
            _this.goToNumber(current);
        },
        //下一页
        goToRight: function (e) {
            var _this = e.data.thisObj;

            var current = _this.getCurrentNumber();
            current += 1;
            _this.goToNumber(current);
        },
        //跳转到指定页
        goToNumber: function (number, isSubmit) {
            var elem = this.elem;
            var opts = this.opts;
            var maxNumber = this.getMaxNumber();
            var minNumber = this.getMinNumber();

            //刷新模式
            if (opts.async) {

            } else {
                //非异步模式
                if (number > opts.pageCount) {
                    opts.tip('亲，没有下一页了');
                    return false;
                } else if (number < 1) {
                    opts.tip('亲，没有上一页了');
                    return false;
                }
            }
            //设置结果
            elem.attr('pageindex', number);

            //提交事件触发
            if (isSubmit == false)
                return;
            opts.submitEvent();
        },
        //获取当前组最大项数字
        getMaxNumber: function () {
            var last = this.elem.find('.pageBar_Number .number').last();
            var maxStr = last.attr('data-value');
            var max = parseInt(maxStr);
            if (isNaN(max))
                return this.opts.pageCount;
            return max;
        },
        //获取当前组最小项数字
        getMinNumber: function () {
            var first = this.elem.find('.pageBar_Number .number').first();
            var minStr = first.attr('data-value');
            var min = parseInt(minStr);
            if (isNaN(min))
                return 1;
            return min;
        },
        //获取当前活动页，数值
        getCurrentNumber: function () {
            var currentStr = this.elem.attr('pageindex');
            var current = parseInt(currentStr);
            if (isNaN(current))
                return 1;
            return current;
        }
    }

    //绑定的事件集合
    var eventData = {
        //数字按钮事件
        numberClick: function (e) {
            var _this = e.data.thisObj;
            var number = parseInt($(this).attr('data-value'));
            var current = _this.getCurrentNumber();
            if (number == current)
                return false;
            _this.goToNumber(number);
        }

    }

    //获取div,指定class=clear
    function getClear() {
        return getDivByClass('clear');
    }
    //获取div，指定class
    function getDivByClass(name) {
        var div = $('<div />');
        div.addClass(name);
        return div;
    }
    //获取span，指定class
    function getSpanByClass(name) {
        var span = $('<span />');
        span.addClass(name);
        return span;
    }

    $.fn.pageBar = function (options) {
        var bar = new PageBar(this, options);
        bar.init();
        return bar;
    }

})(jQuery);
