import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';

const Button = (props) => {
  const {style, children, onPress} = props;
  return (
    <View>
      <TouchableOpacity onPress={() => onPress()}>
        <View style={{...style}}>{children}</View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
