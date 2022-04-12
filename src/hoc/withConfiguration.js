import { useContext } from "react";
import { configurationContext } from "../contexts/configuration";

export function withConfiguration(Component) {
  function WithConfiguration(props) {
    const configuration = useContext(configurationContext);
    return (<Component configuration={configuration} {...props}/>);
  }

  const componentName = Component.displayName
    || Component.name
    || 'Component';
  WithConfiguration.displayName = `withConfiguration(${componentName})`;

  return WithConfiguration;
}