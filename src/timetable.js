
/**Returns an object such that we can get a module by doing
 * obj[semester][key], where key is a combination of module and lesson type
 * Given a list of modules, returns them grouped by semester then lesson type and module.
 * @param {Module[]} modules 
 */
function makeSemesterClasses(modules) {
  const semesterClasses = [];

  for (let module of modules) {
    for (let semesterObject of module.semesterData) {
      let semester = semesterObject.semester;
      if (semesterClasses[semester] === undefined) {
        semesterClasses[semester] = {};
      }
      for (let lesson of semesterObject.timetable) {
        const lessonType = lesson.lessonType;
        const key = module.moduleCode + lessonType;
        const classNo = lesson.classNo;
        if (semesterClasses[semester][key] === undefined) {
          semesterClasses[semester][key] = {};
        }
        if (semesterClasses[semester][key][classNo] === undefined) {
          semesterClasses[semester][key][classNo] = [];
        }

        const extendedLessonObject = JSON.parse(JSON.stringify(lesson))
        extendedLessonObject['moduleCode'] = module.moduleCode;
        semesterClasses[semester][key][classNo].push(extendedLessonObject);
      }
    }
  }
  return semesterClasses;
}

function putOneSlotLessons(lessons) {
  let timetable = makeEmptyTimetable();
  lessons = JSON.parse(JSON.stringify(lessons));
  for (let [key, classNos] of Object.entries(lessons)) {
    if (classNos.length === 1) {
      const slots = classNos[0];
      if (hasClash(timetable, slots)) {
        return [null, null];
      } else {
        timetable = addToTimetable(timetable, slots);
        delete lessons[key];
      }
    }
  }
  return [timetable, lessons];
}

function getTimetableIndices(start, end) {
  const slotCount = ((+end) - (+start)) / 100;
  return Array.from({ length: slotCount }, (v, i) => i+start);
}

function hasClash(timetable, lessons) {
  return lessons.some((lesson) => {
    const lessonStart = lesson.startTime;
    const lessonEnd = lesson.endTime;
    const day = dayToIndex(lesson.day);

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
  const day = dayToIndex(lesson.day);

  getTimetableIndices(lessonStart, lessonEnd).forEach(
    (index) => { newTimetable[day][index] = true }
  )

  return newTimetable;
}

function generatePermutation(lessons) {
  // Fix those slots that can be fixed
  const [timetable, unconfirmedLessons] = putOneSlotLessons(lessons);

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
      const newTimetable = addToTimetable(timetable, classInstance);
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


  return helper(timetable, [], unconfirmedLessons);
}

function generateLessonPlan(modules, semester) {
  const semesterClasses = makeSemesterClasses(modules);
  let lessonPlan = [];

  console.log(semesterClasses);

  if (semesterClasses[semester]) {
    lessonPlan = generatePermutation(semesterClasses[semester]);
  }

  return lessonPlan ?? [];
}

export { generateLessonPlan, dayToIndex }