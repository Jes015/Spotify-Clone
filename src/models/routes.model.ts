const getFrontRoutes = () => {
  const baseRoutes = {
    search: '/search'
  }
  const staticRoutes = {
    home: '/',
    search: baseRoutes.search,
    profile: '/profile',
    likedSongs: '/liked-songs'
  }

  const dynamicRoutes = {
    search (searchParams: string) {
      return `${baseRoutes.search}/${searchParams}`
    }
  }

  return { staticRoutes, dynamicRoutes }
}

export const frontRoutes = getFrontRoutes()