import {
  StackActions,
  useNavigation as useRNNavigation,
} from '@react-navigation/native';

const useNavigation = () => {
  const rNNavigation = useRNNavigation();

  const navigate = (name: string, params?: object) => {
    rNNavigation.dispatch(() => {
      return StackActions.push(name, params);
    });
  };

  const goBack = () => {
    rNNavigation.dispatch(() => {
      return StackActions.pop(1);
    });
  };

  return {
    navigate,
    goBack,
  };
};

export default useNavigation;
