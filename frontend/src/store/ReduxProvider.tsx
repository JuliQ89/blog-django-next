import { Provider } from "react-redux";
import { store } from "./store";

interface ReduxProviderI {
  children: React.ReactNode;
}

const ReduxProvider = ({ children }: ReduxProviderI) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
