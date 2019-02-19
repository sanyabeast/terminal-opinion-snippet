(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(true);
    } else {
        window.Opinion = factory()
    }
}(this, function(){

    class Opinion {

    	get dom () { return this.canvas.element }
    	get value () { return this.state.value }
    	set positiveColor (color) {
    		this.state.positiveColor = color;
    		this.updateGradients()
    		this.render()
    	} 

    	set negativeColor (color) {
    		this.state.negativeColor = color;
    		this.updateGradients()
    		this.render()
    	} 

    	get height () {
    		return this.state.h
    	}

    	set height (h) {
    		this.setSize(this.state.w, h);
    	}

    	constructor () {
    		this.state = {
    			w: 40,
    			h: 400,
    			value: 0.5,
    			itemHeight: 10,
    			positiveColor: "#0ad562",
    			negativeColor: "#e45342",
    			angle: 45
    		}


    		this.canvas = {}
    		this.canvas.element = document.createElement("canvas")
    		this.canvas.context = this.canvas.element.getContext("2d")

    		this.updateGradients()

    		this.setSize(this.state.w, this.state.h)
    		this.setValue(this.state.value)
    		this.render()
    	}

    	updateGradients () {
    		let positiveColor = this.canvas.context.createLinearGradient(0, 0, 0, this.state.itemHeight / 2);
			positiveColor.addColorStop(1, "#0f2133");
			positiveColor.addColorStop(0, this.state.positiveColor);

			this.state.positiveColor = positiveColor

			let negativeColor = this.canvas.context.createLinearGradient(0, 0, 0, this.state.itemHeight / 2);
			negativeColor.addColorStop(1, this.state.negativeColor);
			negativeColor.addColorStop(0, "#0f2133");

			this.state.negativeColor = negativeColor
    	}

    	setSize (w, h) {
    		this.state.w = w
    		this.state.h = h
    		this.canvas.element.width = w
    		this.canvas.element.height = h
    		this.render()
    	}

    	/*0-1*/
    	setValue (value) {
    		this.state.value = value
    		this.render()
    	}

    	render () {
    		this.canvas.context.clearRect(0, 0, this.state.w, this.state.h)
    		let itemsCount = this.state.h / this.state.itemHeight

    		for (var a = 0, itemPosition; a < itemsCount; a++){
    			itemPosition = (a * this.state.itemHeight) / this.state.h
    			this.renderItem(itemPosition)
    		}
    	}

    	renderItem (itemPosition) {
    		let y = this.state.h * itemPosition
    		let h = this.state.itemHeight / 2
    		let w = this.state.w / 2
    		let x = 0 + w / 2;
    		let itemIsPositive = itemPosition < this.state.value

    		let angle = (itemIsPositive) ? this.state.angle : -this.state.angle
    		let color = (itemIsPositive) ? this.state.positiveColor : this.state.negativeColor

    		if (itemIsPositive){
    			this.canvas.context.fillStyle = color
	    		this.canvas.context.save()
	    		this.canvas.context.setTransform(1, -Math.tan(this.toRad(angle)), 0, 1, 0, 0);
	    		this.canvas.context.translate(x + 2, y + 2 * h)
	    		this.canvas.context.rotate(this.toRad(angle))
	    		this.canvas.context.fillRect(0, 0, w, h)  	
	    		this.canvas.context.restore()   			
    		} else {
    			this.canvas.context.fillStyle = color
	    		this.canvas.context.save()
	    		this.canvas.context.setTransform(1, -Math.tan(this.toRad(angle)), 0, 1, 0, 0);
	    		this.canvas.context.translate(x - 2, y - 2 * h)
	    		this.canvas.context.rotate(this.toRad(angle))
	    		this.canvas.context.fillRect(0, 0, w, h)  	
	    		this.canvas.context.restore()
    		}
    		this.canvas.context.setTransform(1, 0, 0, 1, 0, 0);	


    	}

    	toRad (angle) {
    		return angle * Math.PI / 180
    	}
    }

    return Opinion;
    
}));