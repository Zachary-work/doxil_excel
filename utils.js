import { median } from 'mathjs';

const cal_result = (rawInput, rawUsInterestRate) => {

    const usInterestRate = parseFloat(rawUsInterestRate) / 100;

    const input = rawInput.map((_data) => {
        return parseFloat(_data) / 100;
    });
    
    const inputWithOrder = input.map((_data, _index) => {
        return {
            value: _data,
            index: _index,
        };
    }).sort((a, b) => {
        if(a.value === b.value) return 0;
        return (a.value  > b.value) ? 1 : -1;
    });
    
    const baselines = input.map((_data) => {
        return _data - usInterestRate;
    }).sort();
    
    var sellGroup = baselines.slice(0, Math.floor(baselines.length/2));
    var buyGroup = baselines.slice(Math.ceil(baselines.length/2), baselines.length);

    const med = median(baselines);

    const sell_result = cal_group_result(sellGroup, med, -1);
    const buy_result = cal_group_result(buyGroup, med, 1);

    const compromiser = (baselines.length % 2 === 1) ? [0] : null;
    
    const result = sell_result.concat(compromiser, buy_result).filter((_item) => _item !== null).sort((a,b) => {
        return a - b;
    });
    
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

    return sortedResult;
}

const cal_group_result = (group, med, factor) => {
    var diff_group = group.map((_data) => {
        return Math.abs(_data - med);
    });

    var sum_group = diff_group.reduce((acc, _data) => {
        return acc + _data;
    });

    var result = diff_group.map((_data) => {
        return (_data / sum_group) * factor;
    });

    return result;
}

export default cal_result;