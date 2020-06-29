import React from "react";
import CanvasJSReact from "../lib/canvasjs/canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart

class PieMarker extends React.Component{
	render() {
		      	/**Define number of minutes to consider an alert to show **/
				let minutes_for_alert = 60;
		      let car_in=0;
              let car_alert=0;
				let alert = 0;
                var DateDiff = {
				inMinutes: function(d1, d2) {
                    var t2 = d2.getTime();
                    var t1 = d1.getTime();

                    return parseInt((t2-t1)/(1000*60));
                },
                inDays: function(d1, d2) {
                    var t2 = d2.getTime();
                    var t1 = d1.getTime();

                    return parseInt((t2-t1)/(24*3600*1000));
                },

                inWeeks: function(d1, d2) {
                    var t2 = d2.getTime();
                    var t1 = d1.getTime();

                    return parseInt((t2-t1)/(24*3600*1000*7));
                },

                inMonths: function(d1, d2) {
                    var d1Y = d1.getFullYear();
                    var d2Y = d2.getFullYear();
                    var d1M = d1.getMonth();
                    var d2M = d2.getMonth();

                    return (d2M+12*d2Y)-(d1M+12*d1Y);
                }
            }
            console.log(this.props.period)

		    if (this.props.period==="day"){
			  this.props.car_in.map(item =>{
				    if (DateDiff.inDays(new Date(item.date),new Date()) <1 ){
				    	car_in = car_in +1;

				    	console.log(DateDiff.inDays(new Date(item.date),new Date()));
					}

			  })

			}
			if (this.props.period==="week") {
				this.props.car_in.map(item => {
					if (DateDiff.inWeeks(new Date(item.date),new Date()) < 1) {
						car_in = car_in + 1;
					}
				})
			}
			if (this.props.period==="month") {
				this.props.car_in.map(item => {
					if (DateDiff.inMonths(new Date(item.date),new Date()) < 1) {
						car_in = car_in + 1;
					}
				})
			}
			if (this.props.period==="year") {
				this.props.car_in.map(item => {
					if (DateDiff.inMonths(new Date(item.date),new Date()) < 12) {
						car_in = car_in + 1;
					}
				})
			}
			if (this.props.period==="day"){
			  this.props.car_alert.map(item =>{
				    if (DateDiff.inDays(new Date(item.date),new Date()) <1 ){
				    	car_alert = car_alert +1;
				    	console.log(item.date)
				    	console.log(DateDiff.inMinutes(new Date(item.date),new Date()))
						if(DateDiff.inMinutes(new Date(item.date),new Date()) < minutes_for_alert){
							alert=alert +1;
						}

					}

			  })

			}
			if (this.props.period==="week") {
				this.props.car_alert.map(item => {
					if (DateDiff.inWeeks(new Date(item.date),new Date()) < 1) {
						car_alert = car_alert + 1;
						if(DateDiff.inMinutes(new Date(item.date),new Date()) < minutes_for_alert){
							alert=alert +1;
						}
					}
				})
			}
			if (this.props.period==="month") {
				this.props.car_alert.map(item => {
					if (DateDiff.inMonths(new Date(item.date),new Date()) < 1) {
						car_alert = car_alert + 1;
						if(DateDiff.inMinutes(new Date(item.date),new Date()) < minutes_for_alert){
							alert=alert +1;
						}
					}
				})
			}
			if (this.props.period==="year") {
				this.props.car_alert.map(item => {
					if (DateDiff.inMonths(new Date(item.date),new Date()) < 12) {
						car_alert = car_alert + 1;
						if(DateDiff.inMinutes(new Date(item.date),new Date()) < minutes_for_alert){
							alert=alert +1;
						}
					}
				})
			}
			this.props.handlerAlert(alert);
			console.log("ALERTE DE PIE MARKER")
		console.log(alert)
		const options = {
			animationEnabled: true,
			backgroundColor:"transparent",
			position:"fixed",
			height:"50",
			width:"50",
			subtitles: [{
				text: alert + " ",
				verticalAlign: "center",
				fontSize: 10,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: false,
				dataPoints: [
					{ name: "Car authorized", y: car_in },
					{ name: "Car refused", y: car_alert },

				]
			}]
		}



		return (
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} *//>

		);
	}
}

export default PieMarker;