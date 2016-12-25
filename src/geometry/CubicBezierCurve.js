import Curve from './Curve';
import Canvas from 'utils/Canvas';

/**
 * @classdesc Cubic Bezier Curve
 * @class
 * @category geometry
 * @extends {Curve}
 * @param {Coordinate[]|Number[][]} coordinates - coordinates of the curve
 * @param {Object} [options=null]   - construct options defined in [CubicBezierCurve]{@link CubicBezierCurve#options}
 * @example
 * var curve = new CubicBezierCurve(
 *     [
 *         [121.47083767181408,31.214448123476995],
 *         [121.4751292062378,31.215475523000404],
 *         [121.47869117980943,31.211916269810335]
 *     ],
 *     {
 *         symbol : {
 *             'lineWidth' : 5
 *         }
 *     }
 * ).addTo(layer);
 */
export const CubicBezierCurve = Curve.extend(/** @lends CubicBezierCurve.prototype */ {

    _toJSON: function (options) {
        return {
            'feature': this.toGeoJSON(options),
            'subType': 'CubicBezierCurve'
        };
    },

    // paint method on canvas
    _paintOn: function (ctx, points, lineOpacity) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        this._bezierCurve(ctx, points, lineOpacity);
        Canvas._stroke(ctx, lineOpacity);
        this._paintArrow(ctx, points, lineOpacity);
    }
});

CubicBezierCurve.fromJSON = function (json) {
    var feature = json['feature'];
    var curve = new CubicBezierCurve(feature['geometry']['coordinates'], json['options']);
    curve.setProperties(feature['properties']);
    return curve;
};

export default CubicBezierCurve;