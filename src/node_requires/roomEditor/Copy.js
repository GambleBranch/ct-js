const glob = require('./../glob');
const {extend} = require('./../objectUtils');
const copyDefaults = {
    x: 0,
    y: 0,
    alpha: 1,
    rotation: 0,
    tint: 0xFFFFFF,
    frame: 0,
    extends: {}
};
const serializePlain = [
    'x',
    'y',
    'alpha',
    'rotation',
    'tint',
    'extends',
    'uid', // the type
    'frame'
];

class Copy extends PIXI.AnimatedSprite {
    constructor(copyInfo) {
        const type = glob.currentProject.types[glob.typemap[copyInfo.uid]],
              frames = glob.pixiFramesMap[type.texture];
        super(frames);
        extend(this, copyDefaults);
        extend(this, copyInfo);
    }
    serialize() {
        const out = {};
        for (const key of serializePlain) {
            out[key] = this[key];
        }
        out.scale = {
            x: this.scale.x,
            y: this.scale.y
        };
        return out;
    }
}

module.exports = Copy;
