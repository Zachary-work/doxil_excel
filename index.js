var input = [
    0.1,
    0.05,
    0.03,
    0.56,
    1.52,
    2.58,
    3.58,
    1.23,
    0.2
];

var usInterestRate = 0.12;

var inputWithOrder = input.map((_data, _index) => {
    return {
        value: _data,
        index: _index,
    };
}).sort((a, b) => {
    if(a.value === b.value) return 0;
    return (a.value  > b.value) ? 1 : -1;
});

var baselines = input.map((_data) => {
    return _data - 0.12;
}).sort();

var sellGroup = baselines.slice(0, 4);
var buyGroup = baselines.slice(5, baselines.length);

var isAllPosOrNe_SellGroup = sellGroup.reduce((acc, _data) => {
    if(acc === false){
        return false;
    }
    return (((acc >= 0) && (_data >= 0)) || ((acc <= 0) && (_data <=0 ))) ? _data : false;
}, 0);

var isAllPosOrNe_BuyGroup = buyGroup.reduce((acc, _data) => {
    if(acc === false){
        return false;
    }
    return (((acc >= 0) && (_data >= 0)) || ((acc <= 0) && (_data <=0 ))) ? _data : false;
}, 0);

var buy_result;
var sell_result;

if(isAllPosOrNe_SellGroup){
    var abs_SellGroup = sellGroup.map((_data) => {
        return Math.abs(_data);
    });
    var sum_SellGroup = abs_SellGroup.reduce((acc, _data) => {
        return acc + _data;
    });
    var sell_result = abs_SellGroup.map((_data) => {
        return _data / sum_SellGroup / -2;
    });
} else {
    var factor = Math.abs(sellGroup[0]) + Math.abs(sellGroup[sellGroup.length - 1]);
    var processed_SellGroup = sellGroup.map((_data) => {
        return _data - factor;
    });
    var abs_SellGroup = processed_SellGroup.map((_data) => {
        return Math.abs(_data);
    });
    var sum_SellGroup = abs_SellGroup.reduce((acc, _data) => {
        return acc + _data;
    });
    var sell_result = abs_SellGroup.map((_data) => {
        return _data / sum_SellGroup / -2;
    });
}

if(isAllPosOrNe_BuyGroup){
    var abs_BuyGroup = buyGroup.map((_data) => {
        return Math.abs(_data);
    });
    var sum_BuyGroup = abs_BuyGroup.reduce((acc, _data) => {
        return acc + _data;
    });

    var buy_result = abs_BuyGroup.map((_data) => {
        return _data / sum_BuyGroup / 2;
    });
} else {
    var factor = Math.abs(buyGroup[0]) + Math.abs(buyGroup[sellGroup.length - 1]);
    var processed_BuyGroup = buyGroup.map((_data) => {
        return _data - factor;
    });
    var abs_BuyGroup = processed_BuyGroup.map((_data) => {
        return Math.abs(_data);
    });
    var sum_BuyGroup = abs_BuyGroup.reduce((acc, _data) => {
        return acc + _data;
    });
    var buy_result = abs_BuyGroup.map((_data) => {
        return _data / sum_BuyGroup / 2;
    });
};

var result = sell_result.concat([0], buy_result);

var sortedResult = inputWithOrder.map((_data, index) => {
    return {
        value: result[index],
        index: _data.index
    }
}).sort((a, b) => {
    if(a.index === b.index) return 0;
    return (a.index  > b.index) ? 1 : -1;
}).map((_data) => {
    return _data.value;
});

console.log(sortedResult);