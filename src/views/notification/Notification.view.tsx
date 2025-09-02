import SearchBar from '@/components/common/Searchbar'
import React from 'react'
import NotificationCard from './NotificationCard'
import { NotificationViewProps, Notification } from '@/models/notification'
import InfiniteScrolling from '@/components/ui/InfiniteScrolling'
import Spinner from '@/components/ui/Spinner'
import { useTranslations } from 'next-intl'

const NotificationView: React.FC<NotificationViewProps> = ({ searchQuery, setIsMoreLoading, isMoreLoading, setSearchQuery, isLoading, setIsLoading, allNotifications, filteredNotifications, error, setAllNotifications, divRef, fetchNotification, hasMore, setHasMore, offset, setOffset, handleReadAll }) => {
    const t = useTranslations()
    return (
        <div className="h-full flex flex-col gap-4 min-h-0 md:p-5">
            <div className="flex md:flex-row flex-col justify-between md:gap-0 gap-2 md:items-center">
                <h1 className="text-2xl font-bold">{t('notifications.title')}</h1>
                <div className="flex justify-end items-center gap-4">
                    <SearchBar
                        search={searchQuery}
                        setSearch={(e) => setSearchQuery(e.target.value)}
                        placeholder={t("notifications.search_notification")}
                    />

                </div>
            </div>
            <button className='self-end bg-[#2B4C88] p-2 text-white rounded-4xl' onClick={handleReadAll}>Read All</button>
            {isLoading ? <Spinner /> : <div className="flex-1 overflow-y-auto scrollbar-hide mt-5">

                {error ? (
                    <div className="col-span-full h-full flex items-center justify-center w-full text-center text-red-500">Error loading notifications: {error.message}</div>
                ) : filteredNotifications.length === 0 ? (
                    <div className="col-span-full h-full flex items-center justify-center w-full text-center text-gray-500">{t("notifications.no_data")}</div>
                ) : (

                    <InfiniteScrolling<Notification> setData={setAllNotifications} setOffset={setOffset} offset={offset} divRef={divRef} data={allNotifications} fetchData={fetchNotification} isLoading={isMoreLoading} setIsLoading={setIsMoreLoading} setHasMore={setHasMore} hasMore={hasMore}>

                        <div className={filteredNotifications.length > 0 ? "grid grid-cols-1 gap-6  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid grid-cols-1"}>
                            {filteredNotifications.length > 0 ? <>

                                {filteredNotifications.map((item, index) => (
                                    <NotificationCard notification={item} key={index} />
                                ))}

                            </> :
                                <p className="text-center w-full"> No more notifications found</p>
                            }
                        </div>
                        {filteredNotifications.length > 0 && <div ref={divRef} className="h-2" />}
                    </InfiniteScrolling>
                )}
            </div>}

        </div>
    )
}

export default NotificationView