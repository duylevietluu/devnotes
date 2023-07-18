'use client';

import { UserContext } from '@/lib/context';
import { useUserData } from '@/lib/hook';

const Provider = ({children}) => {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  )
}

export default Provider