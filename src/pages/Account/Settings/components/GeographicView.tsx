import React, {useEffect, useState} from 'react';
import { Select, Spin } from 'antd';
import { LabeledValue } from 'antd/es/select';
import styles from './GeographicView.less';
import City from '../geographic/city'
import Province from '../geographic/province'

export interface GeographicItemType {
  name: string;
  id: string;
}

export interface GeographicType {
  province: GeographicItemType;
  city: GeographicItemType;
}

const { Option } = Select;

const nullSelectItem: LabeledValue = {
  label: '',
  value: '',
  key: '',
};

interface GeographicViewProps {
  value?: {
    province: LabeledValue;
    city: LabeledValue;
  };
  onChange?: (value: { province: LabeledValue; city: LabeledValue }) => void;
}

const GeographicView: React.FC<GeographicViewProps> = ({ value, onChange }) => {
  const [ cityList, setCityList] = useState<GeographicItemType[]>()

  useEffect(() => {
    if (value?.province) {
      setCityList(City[value?.province.key || '']);
    }
  }, [value?.province])

  // 展示对应的select的Options
  const getOption = (list: GeographicItemType[]) => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  };

  // 获取省份对应的展示
  const getProvinceOption = () => {
    if (Province) {
      return getOption(Province);
    }
    return [];
  };

  const selectProvinceItem = (item: LabeledValue) => {
    if (onChange) {
      onChange({
        province: item,
        city: nullSelectItem,
      });
    }
  };

  const selectCityItem = (item: LabeledValue) => {
    if (value && onChange) {
      onChange({
        province: value.province,
        city: item,
      });
    }
  };

  const getCityOption = () => {
    if (cityList) {
      return getOption(cityList);
    }
    return [];
  };

  return (
    <Spin spinning={false} wrapperClassName={styles.row}>
      <Select
        className={styles.item}
        value={value?.province}
        labelInValue
        showSearch
        onSelect={selectProvinceItem}
      >
        {getProvinceOption()}
      </Select>
      <Select
        className={styles.item}
        value={value?.city}
        labelInValue
        showSearch
        onSelect={selectCityItem}
      >
        {getCityOption()}
      </Select>
    </Spin>
  );
};

export default GeographicView;
