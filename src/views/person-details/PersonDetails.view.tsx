import SearchBar from '@/components/common/Searchbar'
import InfiniteScrolling from '@/components/ui/InfiniteScrolling'
import Spinner from '@/components/ui/Spinner'
import { getLocalStorageItem } from '@/lib/storage'
import { PersonDetails, PersonDetailsViewProps } from '@/models/person-details'
import { GOOGLE_KPH_BUCKET_URL } from '@/services/config'
import { filterButtonClassname } from '@/styles/tailwind-class'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import { AlertCard } from '../alert/AlertCard'
import dynamic from 'next/dynamic'

const IconFilter = dynamic(() => import('@tabler/icons-react').then((mode) => mode.IconFilter))
const IconFilterX = dynamic(() => import('@tabler/icons-react').then((mode) => mode.IconFilterX))
const TimeFiltersDialogue = dynamic(() => import('@/components/dialogue/TimeFiltersDialogue').then((mode) => mode.TimeFiltersDialogue))



const PersonDetailsView: React.FC<PersonDetailsViewProps> = ({ personDetails, offset, divRef, isLoading, setOffset, date, err, startTime, alertsLoading, hasMore,setAlertsLoading, setHasMore, endTime, handleApplyFilter, filterDial, setFilterDial, setIsDateFiltered, isDateFiltered, fetchAlertsByPersonId, setDate, setEndTime, setIsLoading, setPersonDetails, setStartTime }) => {
    const remoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}')
    const localHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}')
    const isValidHub = (remoteHub || localHub) && (typeof remoteHub === 'object' || typeof localHub === 'object') && ('id' in remoteHub || 'id' in localHub);
    const baseUrl = isValidHub ? remoteHub.id ? `http://turn.kapidhwaj.ai:${remoteHub.static_port}/` : `http://${localHub.id}.local:3000/` : GOOGLE_KPH_BUCKET_URL
    const t = useTranslations()
    return (
        <div className="h-full flex flex-col gap-3 min-h-0 px-2 md:px-4">
            {isLoading ? <Spinner/>:<>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 ">
                <div className='flex items-center gap-3'>
                        <Image priority={false} className="rounded-full object-cover w-20 h-20 aspect-auto" src={baseUrl + personDetails[0]?.persons[0]?.gcp_image_path} alt={personDetails[0]?.persons[0]?.name} width={200} height={200} />
                    <div className='flex flex-col items-start'>
                        <h1 className="sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold whitespace-nowrap">
                            {personDetails[0]?.persons[0]?.name}
                        </h1>
                        <div className='flex gap-1 items-center'>

                            <h3 className=" text-gray-400  font-bold whitespace-nowrap">
                                {personDetails[0]?.persons[0]?.category?.name}
                            </h3>
                            <div style={{ backgroundColor: personDetails[0]?.persons[0]?.category?.color_code }} className={`rounded-full w-3 h-3`}>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <SearchBar search="" setSearch={() => { }} placeholder={t("alerts.search_alerts")} />
                    <button
                        className={filterButtonClassname}
                        onClick={() => { setFilterDial(true); setOffset(0); setHasMore(true) }}
                    >
                        <IconFilter stroke={1} size={24} />
                        <span className="hidden sm:inline">{t('alerts.filter')}</span>
                    </button>
                    {isDateFiltered && <button onClick={async () => {
                        setDate(undefined);
                        setStartTime(undefined);
                        setEndTime(undefined);
                        setIsDateFiltered(false);
                        setOffset(0);
                        setIsLoading(true);
                        setHasMore(true)
                        try {
                            const freshAlerts = await fetchAlertsByPersonId(0);
                            setPersonDetails(freshAlerts);
                        } finally {
                            setIsLoading(false);
                        }
                    }} className="bg-[#2B4C88] text-white font-medium py-1 md:py-2 px-2 md:px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1">
                        <IconFilterX stroke={1} size={24} />
                        <span className="hidden sm:inline">{t('common.clear_filter')}</span>
                    </button>}
                </div>
            </div>
            <div className='bg-[var(--surface-100)] scrollbar-hide rounded-2xl md:rounded-4xl flex flex-col gap-3  md:p-6 p-3 md:h-[74vh] h-[37vh] max-h-[37vh]  md:max-h-[74vh]'>
                    <div className="flex-1 flex flex-col gap-2 mb-2 overflow-y-auto scrollbar-hide">
                        {isLoading ? <Spinner /> :
                            <div className='flex-1'>
                                <div className={personDetails.length > 0 ? "grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid grid-cols-1 h-full w-full"}>
                                    <InfiniteScrolling<PersonDetails> setData={setPersonDetails}  setOffset={setOffset} offset={offset} divRef={divRef} data={personDetails} fetchData={fetchAlertsByPersonId} isLoading={alertsLoading} setIsLoading={setAlertsLoading} setHasMore={setHasMore} hasMore={hasMore}>
                                        {personDetails.length > 0 ? <>

                                            {personDetails.map((item, index) => (
                                                <AlertCard alert={item} key={index} />
                                            ))}

                                        </> :
                                            <p className="text-center h-full flex items-center justify-center w-full text-red-500">{err}</p>
                                        }
                                        {personDetails.length > 0 && <div ref={divRef} className="h-2" />}
                                    </InfiniteScrolling>
                                </div>
                                {alertsLoading && <div className="text-center"><Spinner /></div>}
                                {!alertsLoading && !hasMore && personDetails.length > 0 && <p className="text-center">{t('no_more_data')}</p>}
                            </div>
                        }
                    </div>
            </div>
            </>}
            {filterDial && <TimeFiltersDialogue
                date={date}
                startTime={startTime}
                endTime={endTime}
                setDate={setDate}
                setStartTime={setStartTime}
                setEndTime={setEndTime}
                isOpen={filterDial}
                onClose={() => setFilterDial(false)}
                handleApplyFilter={handleApplyFilter}
            />}
        </div>
    )
}

export default PersonDetailsView