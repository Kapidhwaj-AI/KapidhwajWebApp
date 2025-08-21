import { CameraDetailsViewToggleButton } from '@/components/camera/CameraDetailsViewToggleButton'
import CameraStreamCard from '@/components/camera/CameraStreamCard'
import ColumnDropdown from '@/components/camera/ColumnDropdown'
import SearchBar from '@/components/common/Searchbar'
import Spinner from '@/components/ui/Spinner'
import { cn } from '@/lib/utils'
import { FavouriteViewProps } from '@/models/favourite'
import { useTranslations } from 'next-intl'
import React from 'react'

const FavouritesView: React.FC<FavouriteViewProps> = ({search, setSearch, setIsDelete, isDelete, loading, err, filteredFavourites, toogleColumnValue, handleDelete}) => {
    const t = useTranslations()
  return (
      <div className="h-full flex flex-col gap-4 min-h-0 md:p-5">
          <div className="flex flex-wrap justify-between items-center">
              <h1 className="text-2xl font-bold">{t('favourites.title')}</h1>
              <div className="flex flex-wrap justify-between items-center gap-4">
                  <CameraDetailsViewToggleButton />
                  <ColumnDropdown />
                  <SearchBar search={search} setSearch={(e) => setSearch(e.target.value)} placeholder={t('favourites.search_placeholder')} />
              </div>
          </div>
          {loading ? <Spinner /> : err ? <p className="text-red-500 flex items-center justify-center h-full w-full">{err.toString()}</p> :
              <div className="flex-1 overflow-y-auto scrollbar-hide mt-5">
                  {filteredFavourites.length === 0 ? <p className="text-center w-full h-full flex items-center justify-center dark:text-white">{t('favourites.no_favourites')}</p> :
                      <div className={cn("grid grid-cols-1 gap-6 min-h-min",
                          {
                              "md:grid-cols-1": toogleColumnValue === 1,
                              "md:grid-cols-2": toogleColumnValue === 2,
                              "md:grid-cols-3": toogleColumnValue === 3,
                              "md:grid-cols-4": toogleColumnValue === 4,
                              "md:grid-cols-5": toogleColumnValue === 5,
                          }
                      )}>
                          {filteredFavourites.map((favourite, index) => (
                              <CameraStreamCard handleDelete={handleDelete} setIsDelete={setIsDelete} isDelete={isDelete} isFav camera={favourite.camera} key={index} />
                          ))}
                      </div>
                  }

              </div>}
      </div>
  )
}

export default FavouritesView