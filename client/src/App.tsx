import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routes/routes";
import type { AppDispatch, RootState } from "./store/store";
import { useEffect } from "react";
import { getUserThunk } from "./store/thunks/authThunk";
import AuthLoader from "./components/ui/authLoader";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const isAuthLoading = useSelector(
    (state: RootState) => state.auth.isAuthLoading
  );

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  if (isAuthLoading) return <AuthLoader/>;
  return <AppRoutes />;
}

export default App;
