module.exports = {
    plugin: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 375,
            viewportHeight: 667,
            unitPrecision: 5,
            viewportUnit: "vm",//单位
            selectorBlackList: ['ignore',"tab-bar"],//不需要转换的类
            minPixelValue: 1,//小于改数值不做转换
            mediaQuery:false //允许再媒体查询中转换"px"
        }
    }
};
