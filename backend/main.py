from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from typing import List, Optional, Dict, Any

app = FastAPI(title="LAMDEC Dashboard API", version="1.0.0")

# Configurar CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especificar domínios
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Diretório dos arquivos JSON
DATA_DIR = "data"

def load_json_file(filename: str) -> Dict[Any, Any]:
    """Carrega um arquivo JSON do diretório /data"""
    file_path = os.path.join(DATA_DIR, filename)
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"Arquivo {filename} não encontrado")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail=f"Erro ao ler arquivo {filename}")

@app.get("/")
def read_root():
    """Endpoint de teste"""
    return {"message": "FastAPI do Projeto pro LAMDEC funcionando!"}

# Endpoints de resumo - retornam conteúdo dos JSONs
@app.get("/resumo/{arquivo}")
def get_resumo(arquivo: str):
    """
    Retorna o conteúdo de um arquivo JSON para gerar gráficos
    Arquivos disponíveis: distribuicao_cdas, inscricoes_canceladas, inscricoes_quitadas,
    inscricoes, montante_acumulado, quantidade_cdas, saldo_cdas
    """
    # Lista de arquivos válidos (sem extensão)
    arquivos_validos = [
        'distribuicao_cdas', 'inscricoes_canceladas', 'inscricoes_quitadas',
        'inscricoes', 'montante_acumulado', 'quantidade_cdas', 'saldo_cdas'
    ]
    
    # Remove .json se presente
    arquivo_nome = arquivo.replace('.json', '')
    
    if arquivo_nome not in arquivos_validos:
        raise HTTPException(
            status_code=404, 
            detail=f"Arquivo não encontrado. Arquivos disponíveis: {', '.join(arquivos_validos)}"
        )
    
    # Adiciona .json para carregar
    arquivo_completo = f"{arquivo_nome}.json"
    data = load_json_file(arquivo_completo)
    return data

# Endpoint de busca com filtros e ordenação
@app.get("/cda/search")
def search_cda(
    ano: Optional[int] = Query(None, description="Filtrar por ano"),
    situacao: Optional[int] = Query(None, description="Filtrar por situação (-1: Cancelada, 0: Em cobrança, 1: Quitada)"),
    saldo_min: Optional[float] = Query(None, description="Saldo mínimo"),
    saldo_max: Optional[float] = Query(None, description="Saldo máximo"),
    order_by: Optional[str] = Query("ano", description="Ordenar por: 'ano' ou 'saldo'"),
    order_desc: Optional[bool] = Query(False, description="Ordenação decrescente")
):
    """
    Busca e filtra dados do arquivo cdas.json.
    """
    # Carregar dados do cdas.json
    data = load_json_file("cdas.json")

    # Garante que data seja uma lista
    registros = data if isinstance(data, list) else data.get('data', [])

    # Filtros
    if ano is not None:
        registros = [item for item in registros if int(item.get('ano', -1)) == ano]

    if situacao is not None:
        registros = [item for item in registros if int(item.get('agrupamento_situacao', 999)) == situacao]

    if saldo_min is not None:
        registros = [item for item in registros if float(item.get('valor_saldo_atualizado', 0)) >= saldo_min]

    if saldo_max is not None:
        registros = [item for item in registros if float(item.get('valor_saldo_atualizado', 0)) <= saldo_max]

# Ordenação
    if order_by in ["ano", "saldo"]:
        if order_by == "saldo":
            registros.sort(
                key=lambda x: float(x.get("valor_saldo_atualizado", 0)),
                reverse=order_desc
        )
        else:
            registros.sort(
                key=lambda x: int(x.get("ano", 0)),
                reverse=order_desc
        )

    return {
        "data": registros,
        "total": len(registros),
        "filters": {
            "ano": ano,
            "situacao": situacao,
            "saldo_min": saldo_min,
            "saldo_max": saldo_max,
            "order_by": order_by,
            "order_desc": order_desc
        }
    }


@app.get("/resumo/arquivos")
def listar_arquivos():
    """Lista todos os arquivos disponíveis para resumo"""
    arquivos_disponiveis = [
        'distribuicao_cdas', 'inscricoes_canceladas', 'inscricoes_quitadas',
        'inscricoes', 'montante_acumulado', 'quantidade_cdas', 'saldo_cdas'
    ]
    return {"arquivos": arquivos_disponiveis}

@app.get("/situacoes")
def get_situacoes():
    """Retorna as situações disponíveis com suas descrições"""
    return {
        "situacoes": {
            -1: "Cancelada",
            0: "Em cobrança",
            1: "Quitada"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)