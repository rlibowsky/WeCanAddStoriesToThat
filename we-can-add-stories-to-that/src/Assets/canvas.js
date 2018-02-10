import React, {Component} from 'react';

const width = 400
const height = 400

const drawLeftCheck = ( canvas, ctx ) => {
	ctx.strokeRect(0, 0, width, height)
	
			ctx.beginPath()
			
			const topLeftCornerX = 0.125 * width
			const topLeftCornerY = 0.1 * height
	
			ctx.moveTo(topLeftCornerX, topLeftCornerY) // Top left corner
			ctx.quadraticCurveTo(0.05*width, 0.15*height, 0.05*width, 0.2*height) // 2
			ctx.moveTo(0.05*width, 0.2*height) // 3
					
			const lowRightCornerX = 0.7*width
			const lowRightCornerY = 0.5*height
	
			// Bottom Curve
			ctx.bezierCurveTo(0, height + .4*height, width, height, lowRightCornerX, lowRightCornerY)
			ctx.stroke()
	
			// Middle Curve
			ctx.quadraticCurveTo(0.25 * width, height, topLeftCornerX, topLeftCornerY)
			ctx.stroke()

			ctx.closePath()
			
			ctx.fillStyle = "blue"
			ctx.fill()

			// ROTATE
			var tempCanvas = document.createElement("canvas"),
				tempCtx = tempCanvas.getContext("2d")
			tempCanvas.width = canvas.width
			tempCanvas.height = canvas.height
			tempCtx.fillStyle = "red"
			tempCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height)
			ctx.save()
			ctx.translate(canvas.width, canvas.height)
			ctx.rotate(180 * Math.PI / 180)
			ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width,canvas.height)
			ctx.fillStyle = "red"
			ctx.fill()
			ctx.restore()

}


class Canvas extends Component {

	componentDidMount() {
		const canvas = this.refs.podCanvas
		const ctx = canvas.getContext("2d")

		drawLeftCheck(canvas, ctx)

		// ctx.rotate(45 * Math.PI / 180)
		//ctx.save()
		//ctx.restore()

	}

	render() {
		return (
			<div>
				<canvas ref="podCanvas" width={width} height={height} />
			</div>
		)
	}
}

export default Canvas
