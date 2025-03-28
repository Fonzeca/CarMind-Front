import { ChartComponentLike } from "chart.js";

export interface CorsairOptions {
    width: number,
    color: string,
    dash: number[],
    nearCallback: (elementIndex: number) => void
}

declare module 'chart.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface PluginOptionsByType<TType extends ChartType> {
      corsair: CorsairOptions;
  }
}


const plugin: ChartComponentLike = {
    id: 'corsair',
    defaults: {
        width: 1,
        color: 'black',
        dash: [5, 5],
        nearCallback: (elementIndex: number) => { }
    },
    afterInit: (chart: any, args: any, opts: any) => {
        chart.corsair = {
            x: 0,
            y: 0,
        }
    },
    afterEvent: (chart, args, opts) => {
        const { inChartArea } = args
        const { type, x, y } = args.event;

        if (type === 'mousedown') {
            (chart as any).corsair.drag = true
        } else if (type === 'mouseup') {
            (chart as any).corsair.drag = false
        }



        if (type !== 'mousemove') return

        if (!inChartArea) return
        if (!(chart as any).corsair.drag) return

        (chart as any).corsair.x = x;
        (chart as any).corsair.y = y;
        (chart as any).corsair.draw = inChartArea;
        if (args.event.native !== null) {
            const element = chart.getElementsAtEventForMode(args.event.native, 'x', { axis: "x" }, false)
            if (element.length > 0 && chart.data.labels) {
                (opts as any).nearCallback(element[0].index)
            }
        }
        chart.draw()
    },
    beforeDatasetsDraw: (chart, args: any, opts: any) => {
        const { ctx } = chart
        const { top, bottom, left, right } = chart.chartArea
        const { x, y, draw } = (chart as any).corsair
        if (!draw) return

        ctx.save()

        ctx.beginPath()
        ctx.lineWidth = opts.width
        ctx.strokeStyle = opts.color
        // ctx.setLineDash(opts.dash)
        ctx.moveTo(x, bottom)
        ctx.lineTo(x, top)
        // ctx.moveTo(left, y)
        // ctx.lineTo(right, y)
        ctx.stroke()

        ctx.restore()
    }
}

export default plugin;