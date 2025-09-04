import { Checkbox } from '@/components/ui/checkbox';
import { BASE_URL } from '@/lib/protectApi';
import { Camera } from '@/models/camera';
import React from 'react'

interface StreamsCardProps {
    selectedStreams: Set<string>;
    toggleStreamSelection: (id: string) => void;
    stream: Camera
}

const StreamsCard: React.FC<StreamsCardProps> = ({ selectedStreams, toggleStreamSelection, stream }) => {
    return (
        <div
            className={`group relative bg-white p-5 dark:bg-gray-800 rounded-xl overflow-hidden ${selectedStreams.has(stream.camera_id) ? 'ring-2 ring-[#2B4C88]' : ''}`}
        >
            <div className="aspect-video relative">
                <iframe
                    src={`http://${BASE_URL}:8889/${stream?.camera_id}/?net=offline`}
                    allowFullScreen
                    style={{ width: "100%", maxWidth: "800px" }}
                    className='rounded-xl'
                >
                    Your browser does not support the video tag.
                </iframe>
            </div>
            <div className='flex items-center justify-between'>
                <div className="px-3 pt-3 to-transparent">
                    <h3 className="text-sm font-black">{stream.name}</h3>
                    <p className="text-xs text-[#888888]">{stream.organization?.name} {' > '} {stream.folder_id}</p>
                </div>
                <Checkbox
                    checked={selectedStreams.has(stream.camera_id)}
                    onCheckedChange={() => toggleStreamSelection(stream.camera_id)}
                    className='data-[state=checked]:bg-[#2B4C88] data-[state=checked]:border-[#2B4C88]' />
            </div>
        </div>
    )
}

export default StreamsCard