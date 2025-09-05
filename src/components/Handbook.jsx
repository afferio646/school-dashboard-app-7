import React from 'react';
import { BookOpen } from "lucide-react";

// Import the child components that this page needs
import PolicyWatchtower from './PolicyWatchtower.jsx';
import HandbookAuditCard from './HandbookAuditCard.jsx';
import HandbookComparisonCard from './HandbookComparisonCard.jsx';
// NOTE: We cannot import HandbookVulnerabilitiesCard as it is defined inside App.jsx
// We will receive it as a prop instead.

function SectionHeader({ icon, title }) {
    return (
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <h2 className="text-2xl font-bold">{title}</h2>
        </div>
    );
}

// The props are simplified to only pass the data this page needs.
export default function Handbook({
    handbookContent,
    selectedSection,
    setSelectedSection,
    isSectionLanguageOpen,
    setIsSectionLanguageOpen,
    handleSectionLinkClick,
    pendingUpdates,
    archivedUpdates,
    monitoredTrends,
    onViewUpdate,
    apiKey,
    HandbookVulnerabilitiesCardComponent // This component is passed from App.jsx
}) {
    return (
        <div className="max-w-4xl mx-auto space-y-8">

            {/* 1. The Watchtower is now the first card on this page */}
            <PolicyWatchtower
                pendingUpdates={pendingUpdates}
                archivedUpdates={archivedUpdates}
                monitoredTrends={monitoredTrends}
                onViewUpdate={onViewUpdate}
            />

            {/* 2. This is the main IQ Handbook content card */}
            <div className="shadow-2xl border-0 rounded-2xl" style={{ background: "#4B5C64" }}>
                <div className="p-6" style={{ color: "#fff" }}>
                    <SectionHeader icon={<BookOpen className="text-[#faecc4]" size={26} />} title="IQ Handbook" />
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Select Section to Review</label>
                        <select
                            className="block w-full border rounded p-2 shadow text-black"
                            style={{ background: "#fff", border: "2px solid #faecc4" }}
                            value={selectedSection}
                            onChange={e => {
                                setSelectedSection(e.target.value);
                                setIsSectionLanguageOpen(true); // Default to open when new section is selected
                            }}
                        >
                            {Object.keys(handbookContent).map((sectionTitle) => (
                                <option key={sectionTitle} value={sectionTitle}>{sectionTitle}</option>
                            ))}
                        </select>
                    </div>

                    {isSectionLanguageOpen && (
                        <div className="bg-slate-100 p-4 rounded-xl mb-4 shadow-inner border border-slate-200 whitespace-pre-line text-black" style={{ maxHeight: "320px", overflowY: "auto" }}>
                            {handbookContent[selectedSection] || "Language not available."}
                        </div>
                    )}
                </div>
            </div>

            {/* 3. Other cards for this page are rendered here */}
            <HandbookAuditCard />
            <HandbookComparisonCard apiKey={apiKey} />
            {/* We render the component passed as a prop from App.jsx */}
            <HandbookVulnerabilitiesCardComponent onSectionLinkClick={handleSectionLinkClick} />

        </div>
    );
}
