import { useState, useEffect } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    let [data, setData] = useState(props.initialData);
    useEffect(() => {
        if (props.sorting == 'ASC')
            setData([...props.initialData].sort((a, b) => a.id - b.id));
        if (props.sorting == 'DESC')
            setData([...props.initialData].sort((a, b) => b.id - a.id));
    }, [props.initialData, props.sorting]);
    return (
        <div>
            {data.map((item) => (
                <Key item={item} key={item.id} />
            ))}
        </div>
    );
}

function Key(props: { item: IItem }) {
    let [value, setValue] = useState(props.item.name);
    let [newValue, setNewValue] = useState(value);
    let [isInput, setIsInput] = useState(false);
    let key;

    if (!isInput) {
        key = <div onClick={() => setIsInput(true)}>{value}</div>;
    } else {
        key = (
            <input
                value={newValue}
                onKeyDown={(e) => {
                    if (e.keyCode == 13) {
                        setValue(newValue);
                        setIsInput(false);
                    } else if (e.keyCode == 27) {
                        setNewValue(value);
                        setIsInput(false);
                    }
                }}
                onChange={(e) => setNewValue(e.target.value)}
            />
        );
    }
    return key;
}
