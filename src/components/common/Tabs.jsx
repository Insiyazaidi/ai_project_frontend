import React from 'react'

const Tabs = ({ tabs, activetab, setactivetab }) => {
  return (
    <div className="w-full">

      <div className="relative border-b-2 border-slate-100">
        <nav className="flex gap-2">

 {/* Display name  */}
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setactivetab(tab.name)}
              className={`relative pb-4 px-2 md:px-6 text-sm font-semibold transition-all duration-200 ${
                activetab === tab.name
                  ? "text-primary-dark"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="relative z-10">{tab.label}</span>


 {/* Bottom Line Indicator */}

              {activetab === tab.name && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary-dark to-primary rounded-full shadow-lg shadow-soft"></div>
              )}

               {/* background gradient */}

              {activetab === tab.name && (
                <div className="absolute inset-0 bg-linear-to-r from-primary-dark to-transparent rounded-t-xl -z-10" />
              )}
            </button>
          ))}


        </nav>
      </div>

      <div className="py-6">
        {tabs.map((tab) =>
          tab.name === activetab ? (
            <div key={tab.name} className="animate-in fade-in duration-300">
              {tab.content}
            </div>
          ) : null
        )}
      </div>

    </div>
  );
};

export default Tabs;