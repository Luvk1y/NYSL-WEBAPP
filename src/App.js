import React, { useState, useEffect } from 'react';
import './App.css';
import { CourseList } from './components/Course/CourseList';
import { addScheduleTimes } from './utilities/functions';
import { Banner } from './components/banners/Banner';
import { useData } from './utilities/firebase.js';

const App = () => {
  const [schedule, loading, error] = useData('/', addScheduleTimes); 
  
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Mirko is angry...</h1>

  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
  );
};

export default App;











