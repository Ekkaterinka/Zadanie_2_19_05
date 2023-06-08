import { useState } from 'react'
import uuid from 'react-uuid';


interface Exercise {
  id: string;
  data: string;
  km: number;
}

export default function Table() {
  const [data, setData] = useState('');
  const [km, setKm] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const setNewUchet = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newExercise = {
      data: data,
      km
    };
    const index = exercises.findIndex(n => n.data === newExercise.data);
    if (index === -1) {
      setExercises(prevExercises => [...prevExercises, { id: uuid(), ...newExercise }]);
    } else {
      setExercises(prevExercises => {
        const newExercises = [...prevExercises];
        newExercises[index].km += newExercise.km;
        return newExercises;
      });
    }

    setData('');
    setKm(0);
  }
  console.log(exercises)
  const tableRows = exercises.sort((a, b) => Number(a.data) - Number(b.data)).map((e) => {
    return (
      <tr key={e.id}>
        {/* <td>{(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(e.data))}</td> */}
        <td>{e.data}</td>
        <td>{e.km}</td>
        <td><button onClick={() => {
          setExercises(
            exercises.filter(a =>
              a.data !== e.data
            )
          );
        }}>
          x
        </button></td>
      </tr>
    );
  });

  return (
    <div>
      <form onSubmit={setNewUchet}>
        <label htmlFor="data">Дата (ДД.ММ.ГГ)</label>
        <input type="data" id='data' name='data' value={data} onChange={event => setData(event.target.value)} />
        <label htmlFor="km">Пройдено км</label>
        <input type="number" id='km' name='km' value={km} onChange={event => setKm(event.target.valueAsNumber)} />
        <button className='ok'>OK</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Дата (ДД.ММ.ГГ)</th>
            <th>Пройдено км</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  )
}
