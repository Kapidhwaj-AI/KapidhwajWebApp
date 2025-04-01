export default function Favourites() {
    console.log('Rendering at: homLay', typeof window === 'undefined' ? 'server' : 'client')
    console.log("app-home-page");

    return (
        <div className="flex flex-col items-center justify-center p-8 sm:p-20">
            <h1 className="text-3xl font-bold text-center">Favourites</h1>
            <p className="text-lg text-gray-600 mt-4">This is the Favourites page.</p>
        </div>
    );
}
