
const dataOportunidad = oportunidad =>{

    let data = {}
        
    oportunidad.forEach(reporte => {

        const fechaReporte =  new Date(reporte.fechareporte)
        const fechaSolicitud = new Date (reporte.fecha_solicitud)
        let diferencia= Math.abs(fechaReporte-fechaSolicitud);
        let days = diferencia/(1000 * 3600 * 24)
        
                switch(reporte.siglas.trim()){
                    case'EAC':
                        if( isNaN(data.eneroEac)){
                            data.eneroEac=0
                            data.eneroEacSuma = 0
                        }
                        data.eneroEac = data.eneroEac + 1
                        data.eneroEacSuma = data.eneroEacSuma + days
                
                    break
                    case'EAG':
                        if( isNaN(data.eneroEag)){
                            data.eneroEag=0
                            data.eneroEagSuma = 0
                        }
                        data.eneroEag = data.eneroEag + 1
                        data.eneroEagSuma = data.eneroEagSuma + days
                    break
                    case'EC':
                        if( isNaN(data.eneroEc)){
                                data.eneroEc=0
                                data.eneroEcSuma = 0
                            }
                        data.eneroEc = data.eneroEc + 1
                        data.eneroEcSuma = data.eneroEcSuma + days
                    break
                    case'EM':
                        if( isNaN(data.eneroEm)){
                                data.eneroEm=0
                                data.eneroEmSuma = 0
                            }
                        data.eneroEm = data.eneroEm + 1
                        data.eneroEmSuma = data.eneroEmSuma + days
                    break
                    case'EMA':
                        if( isNaN(data.eneroEma)){
                                data.eneroEma=0
                                data.eneroEmaSuma = 0
                            }
                        data.eneroEma = data.eneroEma + 1
                        data.eneroEmaSuma = data.eneroEmaSuma + days
                    break
                    case'IN':
                        switch(reporte.consecutivo_interno){
                            case'0001':
                                if( isNaN(data.eneroIn1)){
                                    data.eneroIn1=0
                                    data.eneroIn1Suma = 0
                                }
                                data.eneroIn1 = data.eneroIn1 + 1
                                data.eneroIn1Suma = data.eneroIn1Suma + days
                            break
                            case'0002':
                                if( isNaN(data.eneroIn2)){
                                    data.eneroIn2=0
                                    data.eneroIn2Suma = 0
                                }
                                data.eneroIn2 = data.eneroIn2 + 1
                                data.eneroIn2Suma = data.eneroIn2Suma + days
                            break
                            case'0003':
                                if( isNaN(data.eneroIn3)){
                                    data.eneroIn3=0
                                    data.eneroIn3Suma = 0
                                }
                                data.eneroIn3 = data.eneroIn3 + 1
                                data.eneroIn3Suma = data.eneroIn3Suma + days
                            break
                            case'0004':
                                if( isNaN(data.eneroIn4)){
                                    data.eneroIn4=0
                                    data.eneroIn4Suma = 0
                                }
                                data.eneroIn4 = data.eneroIn4 + 1
                                data.eneroIn4Suma = data.eneroIn4Suma + days
                            break
                            default:							
                            break
                        }
                    break
                    case'MO':
                        if( isNaN(data.eneroMo)){
                            data.eneroMo=0
                            data.eneroMoSuma = 0
                        }
                        data.eneroMo = data.eneroMo + 1
                        data.eneroMoSuma = data.eneroMoSuma + days
                    break
                    default:					
                    break
                }      
                
    });

    const datagrafica=[]
    const labelgrafica=[]
    if(!isNaN(data.eneroEac)){
        datagrafica[0]= data.eneroEacSuma/data.eneroEac
        labelgrafica[0] = "EAC"
    }
    if(!isNaN(data.eneroEag)){
        datagrafica[1]= data.eneroEagSuma/data.eneroEag
        labelgrafica[1] = "EAG"
    }
    if(!isNaN(data.eneroEc)){
        datagrafica[2]= data.eneroEcSuma/data.eneroEc
        labelgrafica[2] = "EC"
    }
    if(!isNaN(data.eneroEm)){
        datagrafica[3]= data.eneroEmSuma/data.eneroEm
        labelgrafica[3] = "EM"
    }
    if(!isNaN(data.eneroEma)){
        datagrafica[4]= data.eneroEmaSuma/data.eneroEma
        labelgrafica[4] = "EMA"
    }
    if(!isNaN(data.eneroIn1)){
        datagrafica[5]= data.eneroIn1Suma/data.eneroIn1
        labelgrafica[5] = "IN0001"
    }
    if(!isNaN(data.eneroIn2)){
        datagrafica[6]= data.eneroIn2Suma/data.eneroIn2
        labelgrafica[6] = "IN0002"
    }
    if(!isNaN(data.eneroIn3)){
        datagrafica[7]= data.eneroIn3Suma/data.eneroIn3
        labelgrafica[7] = "IN0003"
    }
    if(!isNaN(data.eneroIn4)){
        datagrafica[8]= data.eneroIn4Suma/data.eneroIn4
        labelgrafica[8] = "IN0004"
    }

   

    const infoOportunidad={
        datagrafica,
        labelgrafica
    }

    return(infoOportunidad)
}

module.exports = {dataOportunidad}