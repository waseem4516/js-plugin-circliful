import {BaseCircle} from "../base-classes/base-circle";
import {IAvailableOptions} from "../interfaces/iavailable-options";
import {ISize} from "../interfaces/isize";
import SvgTags from "../svg-tags";
import SvgTagsHelper from "../svg-tags-helper";

/**
 * Every circle gets dynamically called by the given type in the options object example: { type: 'SimpleCircle' }
 */
class SimpleCircle extends BaseCircle {
    private coordinates = {
        x: 0,
        y: 0,
    };
    private radius: number;

    /**
     * @inheritDoc
     */
    constructor(options: IAvailableOptions, size: ISize) {
        super(options, size);

        const maxSize = this.size.maxSize;
        this.coordinates = {
            x: maxSize / 2,
            y: maxSize / 2,
        };
        this.radius = maxSize / 2.2;
    }

    /**
     * @inheritDoc
     */
    public drawCircle = () => {
        this.drawContainer();
        this.drawBackgroundCircle();
        this.drawForegroundCircle();
        this.drawText();
        this.append();
    }

    /**
     * @description
     */
    public drawBackgroundCircle = () => {
        const circle = SvgTags.addCircle(this.options.id, {
            "id": `circle-${this.options.id}`,
            "cx": String(this.coordinates.x),
            "cy": String(this.coordinates.y),
            "r": String(this.radius),
            "fill": this.options.fillColor,
            "stroke-width": this.options.backgroundBorderWidth,
            "stroke": this.options.backgroundColor,
        });

        this.tags.push({
            element: circle,
            parentId: `svg-${this.options.id}`,
        });
    }

    /**
     * @description
     */
    public drawForegroundCircle = () => {
        const endAngle = 360 / 100 * this.options.percent;
        const strokeWidth = this.options.foregroundBorderWidth;

        const arc = SvgTags.addArc(this.options.id, {
            "id": `arc-${this.options.id}`,
            "fill": "none",
            "d": SvgTagsHelper.describeArc(this.coordinates.x, this.coordinates.y, this.radius, 0, endAngle),
            "stroke": this.options.foregroundColor,
            "stroke-width": strokeWidth,
        });
        this.animate(arc);

        this.tags.push({
            element: arc,
            parentId: `svg-${this.options.id}`,
        });
    }

    /**
     * @description Animates circle counter clock wise
     * @param arc
     */
    private animate(arc: Element) {
        SvgTagsHelper.animateArc({
            arc,
            arcParams: {
                percent: this.options.percent,
                x: this.coordinates.x,
                y: this.coordinates.y,
                radius: this.radius,
            },
        }, this.options.onAnimationEnd);
    }

    /**
     * @description
     */
    public drawText = () => {
        const text = SvgTags.addText(this.options.id, {
            id: `text-${this.options.id}`,
            x: String(this.coordinates.x),
            y: String(this.coordinates.y),
        });
        text.textContent = `${this.options.percent}%`;

        this.tags.push({
            element: text,
            parentId: `svg-${this.options.id}`,
        });
    }
}

export default SimpleCircle;
