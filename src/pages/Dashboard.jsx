import React from "react";
// Components
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import ProgressChart from "../components/ProgressChart";
import MentalChart from "../components/MentalChart";
import MentalStateGrid from "../components/MentalStateGrid";
import AddHabitModal from "../components/AddHabitModal";
import RemoveHabitModal from "../components/RemoveHabitModal";
import Sidebar from "../components/Sidebar";

// Hooks
import { useDashboardData } from "../hooks/useDashboardData";

function Dashboard({ currentUser, onLogout }) {
  const {
    habits,
    mentalState,
    currentDate,
    viewMode,
    setViewMode,
    toggleTheme,
    showAddModal,
    setShowAddModal,
    showRemoveModal,
    setShowRemoveModal,
    changeMonth,
    addHabit,
    toggleHabitForDate,
    removeHabit,
    updateMentalState,
    stats,
  } = useDashboardData(currentUser);

  return (
    <div className="container">
      <Header
        currentUser={currentUser}
        onLogout={onLogout}
        totalHabits={stats.totalHabits}
        completedHabits={stats.completedHabits}
        progressPercent={stats.progressPercent}
        bestStreak={stats.bestStreak}
        onToggleTheme={toggleTheme}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <div className="main-layout">
        {/* LEFT COLUMN: Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minWidth: 0,
          }}
        >
          <Calendar
            habits={habits}
            onToggleHabit={toggleHabitForDate}
            currentDate={currentDate}
            onChangeMonth={changeMonth}
            viewMode={viewMode}
          />

          <div className="card-container">
            <h3 className="section-title">
              Daily Progress (
              {currentDate.toLocaleString("default", { month: "long" })})
            </h3>
            <div className="chart-container">
              <ProgressChart habits={habits} currentDate={currentDate} />
            </div>
          </div>

          <div className="card-container">
            <MentalStateGrid
              mentalState={mentalState}
              onUpdate={updateMentalState}
              currentDate={currentDate}
            />
          </div>

          <div className="card-container">
            <h3 className="section-title">
              Mental State Trends (
              {currentDate.toLocaleString("default", { month: "long" })})
            </h3>
            <div className="chart-container">
              <MentalChart
                mentalState={mentalState}
                currentDate={currentDate}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <Sidebar // --------------------->>>make by ANIKET in 2026
          habits={habits}
          currentDate={currentDate}
          bestStreak={stats.bestStreak} // <--- Added this prop
          onOpenAdd={() => setShowAddModal(true)}
          onOpenRemove={() => setShowRemoveModal(true)}
        />
      </div>

      <AddHabitModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addHabit}
      />

      <RemoveHabitModal
        isOpen={showRemoveModal}
        habits={habits}
        onRemove={removeHabit}
        onClose={() => setShowRemoveModal(false)}
      />
    </div>
  );
}

export default Dashboard;
