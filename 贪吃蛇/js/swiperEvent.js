var xqEvent = {
		eventAll:{
			//"自定义的事件名称":['事件要触发执行的函数1','事件要触发执行的函数2','事件要触发执行的函数3']
		
		},
		init:function(dom){
			dom.eventAll = {},
			dom.addEvent = this.addEvent;
			dom.emit = this.emit;
			dom.removeEvent = this.removeEvent
			dom.touchData = {};
			
			
			//body.emit('swiperLeft',"msg")
			
			dom.addEventListener("touchstart",function(e){
				//console.log(e)
				this.touchData.startX = e.touches[0].pageX;
				this.touchData.startY = e.touches[0].pageY
			})
			dom.addEventListener('touchmove',function(e){
				this.touchData.endX = e.touches[0].pageX;
				this.touchData.endY = e.touches[0].pageY;
			})
			dom.addEventListener("touchend",function(e){
				//console.log(e)
				var x = this.touchData.endX - this.touchData.startX;
				var y = this.touchData.endY - this.touchData.startY
				if( (Math.abs(x) > Math.abs(y)) && Math.abs(x)>100){
					if(x>0){
						//console.log('向右滑动')
						e.swiperDir =  'swiperRight'
						body.emit('swiperRight',e)
					}else{
						//console.log('向左滑动')
						e.swiperDir =  'swiperLeft'
						body.emit('swiperLeft',e)
					}
				}else if((Math.abs(x) < Math.abs(y)) && Math.abs(y)>100){
					if(y>0){
						//console.log('向下滑动')
						e.swiperDir =  'swiperBottom'
						body.emit('swiperBottom',e)
					}else{
						//console.log('向上滑动')
						e.swiperDir =  'swiperTop'
						body.emit('swiperTop',e)
					}
				}
			})
		},
		addEvent:function(eventName,callBackFn){
			
			if(this.eventAll[eventName]==undefined){
				this.eventAll[eventName] = []
			}
			this.eventAll[eventName].push(callBackFn)
		},
		emit:function(eventName,eventMsg){
			if(this.eventAll[eventName]!=undefined){
				this.eventAll[eventName].forEach(function(item,i){
					item(eventMsg)
				})
			}
			
		},
		removeEvent:function(eventName,callBackFn){
			var that  = this
			this.eventAll[eventName].forEach(function(item,i){
				if(item==callBackFn){
					that.eventAll[eventName].splice(i,1)
				}
			})
		},
		
	}