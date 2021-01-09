

/**Returns an object such that we can get a module by doing
 * obj[semester][key], where key is a combination of module and lesson type
 * Given a list of modules, returns them grouped by semester then lesson type and module.
 * @param {Module[]} modules 
 * @param {number} semester
 */
function makeClasses(modules, semester) {
  const classes = {};
  for (let module of modules) {
    const semesterObject = module.semesterData.find(data => data.semester == semester);
    if (!semesterObject) {
      continue;
    }
    for (let lesson of semesterObject.timetable) {
      const lessonType = lesson.lessonType;
      const key = module.moduleCode + lessonType;
      const classNo = lesson.classNo;
      if (classes[key] === undefined) {
        classes[key] = {};
      }
      if (classes[key][classNo] === undefined) {
        classes[key][classNo] = [];
      }

      const extendedLessonObject = JSON.parse(JSON.stringify(lesson))
      extendedLessonObject['moduleCode'] = module.moduleCode;
      classes[key][classNo].push(extendedLessonObject);
      extendedLessonObject['color'] = module.color;
    }
  }
  return classes;
}

function putOneSlotLessons(timetable, lessons) {
  lessons = JSON.parse(JSON.stringify(lessons));
  const confirmedLessons = [];
  for (let [key, classNos] of Object.entries(lessons)) {
    if (Object.values(classNos).length === 1) {
      const slots = classNos[Object.keys(classNos)[0]];
      slots.forEach(slot => { slot.fixed = true });
      if (hasClash(timetable, slots)) {
        return [null, null];
      } else {
        for (let slot of slots) {
          timetable = addToTimetable(timetable, slot);
          confirmedLessons.push(slot);
        }
        delete lessons[key];
      }
    }
  }
  return [timetable, confirmedLessons, lessons];
}

function getTimetableIndices(start, end) {
  const slotCount = ((+end) - (+start)) / 100;
  return Array.from({ length: slotCount }, (v, i) => i + (start / 100));
}

function hasClash(timetable, lessons) {
  return lessons.some((lesson) => {
    const lessonStart = lesson.startTime;
    const lessonEnd = lesson.endTime;
    const day = lesson.dayIndex ?? dayToIndex(lesson.day);

    return getTimetableIndices(lessonStart, lessonEnd).some((i) => timetable[day][i]);
  });
}

function clone2d(arr) {
  return arr.map(x => x.map(y => y));
}

function dayToIndex(day) {
  switch (day) {
    case 'Monday':
      return 0;
    case 'Tuesday':
      return 1;
    case 'Wednesday':
      return 2;
    case 'Thursday':
      return 3;
    case 'Friday':
      return 4;
    case 'Saturday':
      return 5;
    case 'Sunday':
      return 6;
    default:
      return -1;
  }
}

function makeEmptyTimetable() {
  return Array.from({ length: 7 }, (v, i) => []);
}

function addToTimetable(timetable, lesson) {
  const newTimetable = clone2d(timetable);
  const lessonStart = lesson.startTime;
  const lessonEnd = lesson.endTime;
  const dayIndex = lesson.dayIndex ?? dayToIndex(lesson.day);

  getTimetableIndices(lessonStart, lessonEnd).forEach(
    (index) => { newTimetable[dayIndex][index] = true }
  )

  return newTimetable;
}

function generatePermutation(oldTimetable, lessons) {
  // Fix those slots that can be fixed
  const [timetable, confirmedLessons, unconfirmedLessons] = putOneSlotLessons(oldTimetable, lessons);

  if (timetable === null) {
    return [];
  }

  function helper(timetable, confirmedLessons, unconfirmedLessons) {
    if (Object.keys(unconfirmedLessons).length === 0) {
      return confirmedLessons;
    }

    const lessonType = Object.keys(unconfirmedLessons)[0];

    for (let classInstance of Object.values(unconfirmedLessons[lessonType])) {
      if (hasClash(timetable, classInstance)) {
        continue;
      }

      let newTimetable;

      for (let slot of classInstance) {
        newTimetable = addToTimetable(timetable, classInstance);
      }
      const newConfirmedLessons = [...confirmedLessons];
      const newUnconfirmedLessons = JSON.parse(JSON.stringify(unconfirmedLessons));

      newConfirmedLessons.push(...classInstance);
      delete newUnconfirmedLessons[lessonType];

      const permutation = helper(newTimetable, newConfirmedLessons, newUnconfirmedLessons);

      if (permutation) {
        return permutation;
      }
    }
    return null;
  }


  return helper(timetable, confirmedLessons, unconfirmedLessons);
}

function generateLessonPlan(modules, customModules, semester) {
  let timetable = makeEmptyTimetable();
  const classes = makeClasses(modules, semester);

  for (let customModule of customModules) {
    timetable = addToTimetable(timetable, customModule);
  }

  let lessonPlan = classes ? generatePermutation(timetable, classes) : [];
  return lessonPlan ?? [];
}

export { generateLessonPlan, dayToIndex }