import React, { useState, useEffect } from 'react'
import Header from '../../Components/AdminComponents/Academic Management/Header'
import ParentsToolbar from '../../Components/AdminComponents/Academic Management/Parents/ParentsToolbar'
import ParentsTable from '../../Components/AdminComponents/Academic Management/Parents/ParentsTable'
import { getParents } from '../../utils/data/Admin/parents'
import { subscribeAcademic } from '../../utils/data/core'
import { matchGlobalSearch } from '../../utils/search'

const NAV_ITEMS = [
  { name: "Students", path: "/admin/academic" },
  { name: "Teachers", path: "/admin/academic/teachers" },
  { name: "Parents", path: "/admin/academic/parents" },
  { name: "Section", path: "/admin/academic/section" },
  { name: "Schedules", path: "/admin/academic/schedules" },
  { name: "Grade Levels", path: "/admin/academic/grade-levels" },
  { name: "School Years", path: "/admin/academic/school-years" },
];

const COLUMNS = [
  { key: "no", label: "NO." },
  { key: "lastName", label: "LAST NAME" },
  { key: "firstName", label: "FIRST NAME" },
  { key: "email", label: "EMAIL" },
  { key: "student", label: "CHILDREN" },
];

const Parents = () => {
  const [parents, setParents] = useState(getParents);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    return subscribeAcademic(() => setParents(getParents()));
  }, []);

  const filteredParents = parents.filter((parent) => {
    const term = searchValue.trim().toLowerCase();
    return term === "" || matchGlobalSearch(parent, term);
  });

  const handleSearch = () => {
    console.log("Search:", searchValue);
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins]">

      <Header 
        navItems={NAV_ITEMS} 
      />

      <div className="flex flex-1 flex-col gap-2 min-h-0">
        <ParentsToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearch={handleSearch}
        />

        <ParentsTable
          parents={filteredParents}
          columns={COLUMNS}
        />
      </div>
    </div>
  )
}

export default Parents