import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    getAdminDetails,
    updateAdminService,
} from "../services/adminServuces";

import { EditConfig } from "@/shared/constants/adminTables";

interface Props {
    type: string;
    id: number;
    onSuccess?: () => void;
    onClose?: () => void;
  }
    
      export default function UpdateTableBody({
        type,
        id,
        onSuccess,
        onClose,
      }: Props) {

    const navigate = useNavigate();

    const config =
        EditConfig[
        type?.charAt(0).toUpperCase() +
        type?.slice(1)
        ];

    const [formData, setFormData] = useState<any>(
        {}
    );

    useEffect(() => {
        loadDetails();
    }, []);

    const loadDetails = async () => {
        const res = await getAdminDetails(
            config.detailApi,
            Number(id)
        );

        setFormData(res.data.result[0]);
    };

    const handleSave = async () => {
        await updateAdminService(
            config.updateApi,
            formData
        );

        if (onSuccess) {
            onSuccess();
          } else {
            navigate(config.backUrl);
          }
        };

    return (
        <div className="space-y-4  text-gray-900 dark:text-white ">
   
            {config.fields.map((field: any, index: number) => (
                <div key={field.key}>
                    <label className="block mb-1 font-medium text-gray-900 dark:text-white">
                        {config.header[index]?.title || field.key}
                    </label>
                    {field.type === "Boolean" ? (
                     <label className="relative inline-flex items-center cursor-pointer  text-gray-900 dark:text-white">
                     <input
                       type="checkbox"
                       checked={!!formData[field.key]}
                       onChange={() =>
                         setFormData({
                           ...formData,
                           [field.key]: !formData[field.key],
                         })
                       }
                       className="sr-only peer"
                     />
                   
                     <div
                       className="
                         w-11 h-6
                         bg-red-500
                         rounded-full
                         peer
                         peer-checked:bg-green-500
                         after:content-['']
                         after:absolute
                         after:top-[2px]
                         after:left-[2px]
                         after:bg-white
                         after:border
                         after:rounded-full
                         after:h-5
                         after:w-5
                         after:transition-all
                         peer-checked:after:translate-x-5
                       "
                     ></div>
                   
                     <span className="ml-3 text-sm font-medium">
                       {formData[field.key] ? "ACTIVE" : "INACTIVE"}
                     </span>
                   </label>
                    ) : (
                        <input
                            value={formData[field.key] || ""}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    [field.key]:
                                        e.target.value,
                                })
                            }
                           className="border p-2 w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-gray-300 dark:border-slate-700"
                        />
                    )}
                </div>
            ))}

            <div className="flex gap-3">
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Save
                </button>

                <button
                 onClick={() => {
                    if (onClose) {
                      onClose();
                    } else {
                      navigate(config.backUrl);
                    }
                  }}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Back
                </button>
            </div>
            
        </div>
    );
}