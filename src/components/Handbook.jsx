import React from 'react';
import { BookOpen, AlertCircle, TrendingUp } from "lucide-react";

// We are moving all the necessary components and helpers into this file.
// This makes the component self-contained and stable.

function SectionHeader({ icon, title }) {
    return (
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <h2 className="text-2xl font-bold">{title}</h2>
        </div>
    );
}

// We pass the PolicyWatchtower component in as a prop to keep things clean.
export default function Handbook({
    handbookContent,
    handbookSections,
    handleSectionLinkClick,
    isSectionLanguageOpen,
    setIsSectionLanguageOpen,
    selectedSection,
    setSelectedSection,
    setShowSuggestionModal,
    setSuggestedUpdate,
    suggestionSectionRef,
    suggestedSectionLanguage,
    PolicyWatchtowerComponent, // Note this new prop
    HandbookAuditCardComponent,
    HandbookComparisonCardComponent,
    HandbookVulnerabilitiesCardComponent
}) {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* The Watchtower is now the first card on this page */}
            {PolicyWatchtowerComponent}

            {/* This is the original content of the Handbook page */}
            <div className="shadow-2xl border-0" style={{ background: "#4B5C64" }}>
                <div className="p-6" style={{ color: "#fff" }}>
                    <SectionHeader icon={<BookOpen className="text-[#faecc4]" size={26} />} title="IQ Handbook" />
                    <div>
                        <h3 className="text-lg font-bold mb-2" style={{ color: "#faecc4" }}>1. Review by Section</h3>
                        <div className="mb-2">
                            <label className="block font-medium">Select Section</label>
                            <select
                                className="mt-1 block w-full border rounded p-2 shadow text-black"
                                style={{ background: "#fff", border: "2px solid #faecc4" }}
                                value={selectedSection}
                                onChange={e => {
                                    setSelectedSection(e.target.value);
                                    setIsSectionLanguageOpen(false);
                                }}
                            >
                                {handbookSections(handleSectionLinkClick).map((s) => <option key={s.section} value={s.section}>{s.section}</option>)}
                            </select>
                        </div>
                        <div className="mb-2">
                            <button className="text-lg font-bold cursor-pointer focus:outline-none" style={{ color: "#faecc4" }} onClick={() => setIsSectionLanguageOpen(open => !open)}>
                                {selectedSection.split('. ').slice(1).join('. ')}
                            </button>
                            <span className="ml-2 text-xs" style={{ color: "#fff" }}>(Click to show/hide full Handbook Section language)</span>
                        </div>
                        {isSectionLanguageOpen && (
                            <div className="bg-slate-100 p-4 rounded-xl mb-4 shadow-inner border border-slate-200 whitespace-pre-line text-black" style={{ maxHeight: "320px", overflowY: "auto", fontSize: "1rem", lineHeight: "1.55" }}>
                                {handbookContent[selectedSection] || "Language not available."}
                            </div>
                        )}
                        <div className="font-semibold mt-10 mb-2" style={{ color: "#FFF" }}>Potential Section Vulnerabilities</div>
                        <ul className="ml-6 text-sm list-disc">
                            {(handbookSections(handleSectionLinkClick).find(s => s.section === selectedSection)?.vulnerabilities || []).map((vuln, i) => (
                                <li key={i} className={`pl-1 mb-2 p-2 rounded-lg flex items-center gap-2 shadow ${vuln.source === "Industry Trend" ? "bg-yellow-100 border-l-4 border-yellow-400" : "bg-red-100 border-l-4 border-red-400"}`}>
                                    <AlertCircle size={16} className={vuln.source === "Industry Trend" ? "text-slate-600" : "text-red-600"} />
                                    <span style={{ color: "#334155" }}>{vuln.text}</span>
                                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold bg-slate-200 text-slate-600">{vuln.source}</span>
                                </li>
                            ))}
                        </ul>
                         <div className="flex justify-end mt-4">
                            <button
                                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-xl shadow-lg flex items-center gap-2 transition-all"
                                onClick={() => {
                                    const s = handbookSections(handleSectionLinkClick).find(s => s.section === selectedSection);
                                    suggestionSectionRef.current = s.section;
                                    setSuggestedUpdate(suggestedSectionLanguage[s.section] || "Clarify this policy with specific procedures.");
                                    setShowSuggestionModal(true);
                                }}
                            >
                                <TrendingUp size={18} className="text-white opacity-80" />
                                Suggested Handbook Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {HandbookAuditCardComponent}
            {HandbookComparisonCardComponent}
            {HandbookVulnerabilitiesCardComponent}
        </div>
    );
}
