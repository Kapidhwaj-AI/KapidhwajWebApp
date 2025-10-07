import {
  IconX,
  IconCheck,
  IconPlus,
} from "@tabler/icons-react";
import { useState } from "react";
import Modal from "../ui/Modal";

interface AddNewSiteDialogueProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddNewSiteDialogue({
  isOpen,
  onClose,
}: AddNewSiteDialogueProps) {
  const [name, setName] = useState("");
  const handleAddSite = () => {

    onClose();
  };
  const handleSave = () => {
 
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} title='Add New Site'>
      <div className="flex-1">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Name</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name here..."
              className="w-full h-[45px] px-4 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="px-5 py-2 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base"
              onClick={handleAddSite}
            >
              <span className="flex items-center gap-2">
                <IconPlus size={16} /> Add
              </span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-4"></div>

        {/* All Sites Section */}
        <div>
          <h2 className="text-sm mb-2">All Sites</h2>
          <div className="w-full lg:h-[300px] xl:h-[400px] bg-[var(--surface-100)] p-5 rounded-[24px]">
            <div className="space-y-3 h-full overflow-y-auto pr-2 scrollbar-hide">
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            className="px-5 py-2 bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full text-base"
            onClick={onClose}
          >
            <span className="flex items-center gap-2 text-[#888888]">
              <IconX size={16} />
              Close
            </span>
          </button>
          <button
            className="px-5 py-2 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base"
            onClick={handleSave}
          >
            <span className="flex items-center gap-2">
              <IconCheck size={16} />
              Save
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
