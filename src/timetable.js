
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
        if (semesterClasses[semester][key] === undefined) {
          semesterClasses[semester][key] = [];
        }

        const extendedLessonObject = JSON.parse(JSON.stringify(lesson))
        extendedLessonObject['moduleCode'] = module.moduleCode;
        semesterClasses[semester][key].push(extendedLessonObject);
      }
    }
  }
  return semesterClasses;
}

function putOneSlotLessons(lessons) {
  let timetable = makeEmptyTimetable();
  lessons = JSON.parse(JSON.stringify(lessons));
  for (let [key, lessonSlots] of Object.entries(lessons)) {
    if (lessonSlots.length === 1) {
      const slot = lessonSlots[0];
      console.log("slot");
      console.log(slot);
      if (hasClash(timetable, slot)) {
        console.log("got clash");
        return [null, null];
      } else {
        timetable = addToTimetable(timetable, slot);
        delete lessons[key];
      }
    }
  }
  return [timetable, lessons];
}

function getTimetableIndices(start, end) {
  const slotCount = ((+end) - (+start)) / 100;
  return Array.from({ length: slotCount }, (v, i) => i);
}

function hasClash(timetable, lesson) {
  const lessonStart = lesson.startTime;
  const lessonEnd = lesson.endTime;
  const day = dayToIndex(lesson.day);

  return getTimetableIndices(lessonStart, lessonEnd).some((i) => timetable[day][i]);
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

function makeTimetable(confirmedLessons) {
  let timetable = makeEmptyTimetable();
  for (let lesson in confirmedLessons) {
    timetable = addToTimetable(timetable, lesson);
  }
  return timetable;
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

    const lessonToChoose = Object.keys(unconfirmedLessons)[0];

    for (let lessonSlot of unconfirmedLessons[lessonToChoose]) {
      if (hasClash(timetable, lessonSlot)) {
        continue;
      }
      const newTimetable = addToTimetable(timetable, lessonSlot);
      const newConfirmedLessons = [...confirmedLessons];
      const newUnconfirmedLessons = JSON.parse(JSON.stringify(unconfirmedLessons));

      newConfirmedLessons.push(lessonSlot);
      delete newUnconfirmedLessons[lessonToChoose];

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

  if (semesterClasses[semester]) {
    lessonPlan = generatePermutation(semesterClasses[semester]);
  }

  return lessonPlan;
}

export { generateLessonPlan, dayToIndex }