import { useState } from 'react'
import uuid from 'react-uuid';
 
interface Exercise {
 id: string;
 data: number;
 km: number;
}
 
// const Tab = [{ id: uuid(), data: '', km: 0 }]
  
export default function Table( ){
  const [data, setData] = useState('');
  const [km, setKm] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>([]);
 
  const getTimestamp = (data: string): number => {
    
    // вам тут нужно будет распарсить дату
    return new Date().valueOf()
  }

  new Date.toLocaleString(data)
  const setNewUchet = (event: React.FormEvent<HTMLFormElement>) => {
 event.preventDefault();
    const newExercise = {
 data: getTimestamp(data),
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

  const tableRows = exercises.sort((a, b) => a.data - b.data).map((e) => {
    return (
        <tr key={e.id}>
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
  