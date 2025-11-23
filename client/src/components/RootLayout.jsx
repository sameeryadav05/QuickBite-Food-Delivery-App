
import { Outlet, useNavigation } from 'react-router-dom'
import Loader from './Loader';

function RootLayout() {
  const navigation = useNavigation();
  let isLoading = navigation.state === "loading";
  console.log(navigation)

  if(isLoading) return <Loader/>

  return (
    <>
      <Outlet />
    </>
  );
}

export default RootLayout