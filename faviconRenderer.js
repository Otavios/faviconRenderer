const faviconRenderer = {
	fps: 10,

	// Pass the canvas element you want to render on favicon
	// You can specify the area of the canvas to be rendered: a rectangle from (x, y) to (x + width, y + height)
	setCanvas(canvas, x, y, width, height){
		this.canvas = canvas
		this.auxCanvas = canvas.cloneNode(true)
		this.x = x || 0
		this.y = y || 0
		this.width = width || canvas.width
		this.height = height || canvas.height
		return this
	},

	// Call this function to update the favicon
	render(){
		this.auxCanvas.getContext('2d').drawImage(this.canvas, this.x, this.y, this.width, this.height, 0, 0, this.auxCanvas.width, this.auxCanvas.height)
		let favicon = document.getElementById('favicon')
		if(!favicon)
		favicon = this.createFavicon()
		let newIcon = favicon.cloneNode(true)
		newIcon.href = this.auxCanvas.toDataURL()
		favicon.parentNode.replaceChild(newIcon, favicon)
	},

	// Starts the rendering loop
	startLoop(){
		this.loop = setInterval(() => this.render(), this.fps/1000)
	},

	setFps(fps){
		this.fps = fps
		return this
	},

	stopLoop(){
		clearInterval(this.loop)
	},

	createFavicon(){
		let favicon = document.createElement('link')
		favicon.rel = 'icon'
		favicon.href = ''
		favicon.id = 'favicon'
		document.head.appendChild(favicon)
		return favicon
	},
}