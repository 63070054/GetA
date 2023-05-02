import GuidelineCard from "@/components/Card/GuidelineCard";
import GuideLineContainer from "@/components/Container/GuideLineContainer";
import MediumComtainer from "@/components/Container/MediumContainer";
import ShowFilterSelected from "@/components/Filter/ShowFilterSelected";
import SearchInput from "@/components/Input/SearchInput";
import FilterModal from "@/components/Modal/FilterModal";
import api from "@/plugins/axios/api";
import { useRouter } from "next/router";
import { useState } from 'react';
import { useEffect } from 'react';

const index = () => {
    const [searchInput, setSearchInput] = useState<string>("")

    const [guideLines, setGuideLines] = useState<GuideLineCard[]>([])
    const filterGuideLines = guideLines.filter(guideLine => {
        const includeText = guideLine.title.toLowerCase().includes(searchInput.toLowerCase()) || guideLine.description.toLowerCase().includes(searchInput.toLowerCase()) || guideLine.ownerName.toLowerCase().includes(searchInput.toLowerCase())
        return includeText
    })

    const router = useRouter()

    useEffect(() => {

        const getGuideLines = async () => {
            try {
                const response = await api.get("/guides")
                console.log(response)
                const copyseGuideLines = response.data
                setGuideLines([...copyseGuideLines])
            } catch (err) {
                console.log(err)
            }
        }

        if (router.isReady) {
            getGuideLines()
        }


    }, [router.isReady])

    return (
        <MediumComtainer>
            <div className="flex flex-col gap-6 w-full">
                <SearchInput {...{ searchInput, setSearchInput }} />
                <GuideLineContainer>
                    {filterGuideLines?.map(guideLine => (
                        <GuidelineCard key={guideLine.id} {...guideLine} />
                    ))}
                </GuideLineContainer>
            </div>
        </MediumComtainer>
    );
};

export default index;