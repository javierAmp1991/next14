export default function Page({params}:{params: {id: string, idBlueprint: string}}){
    return (
      <div>
        <p>Aqui va el plano</p>
        <p> {params.id}</p>
        <p> {params.idBlueprint}</p>
      </div>
    );
}