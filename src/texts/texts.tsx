import { WeatherEnum } from "../utils/weather-enum.utils";

export class Texts {
    public static home = {
        title: 'Amicci Weather',
        button: {
            text: 'Começar Agora',
        },
        imageAlt: 'Imagem de um guarda-chuva com fundo azul',
        notificationError: {
            title: 'Não foi possível obter a localização',
            description: 'Verifique a permissão de localização do navegador, sem ela não será possível obter a previsão do tempo.',
        },
    }
    public static nextDaysCards = {
        notificationError: {
            title: 'Erro ao buscar a previsão do tempo',
            description: 'Verifique sua conexão com a internet e tente novamente.',
        }
    }
    public static weatherPage = {
        notificationError: {
            title: 'Erro ao buscar a previsão do tempo',
            description: 'Verifique sua conexão com a internet e tente novamente.',
        }
    }
    public static visibility(value: number) {
        switch (true) {
            case value < 1:
            return 'Condições severas. Visibilidade crítica, nevoeiro intenso ou chuva forte.';
            case value >= 1 && value <= 4:
            return 'Visibilidade limitada. Pode dificultar a condução e a navegação.';
            case value >= 5 && value <= 9:
            return 'Visibilidade razoável, mas ainda com risco em áreas abertas ou rodovias.';
            case value >= 10 && value <= 19:
            return 'Visibilidade adequada para a atividades ao ar livre e tráfego.';
            case value >= 20 && value <= 40:
            return 'Céu limpo ou levemente nublado, sem interferência significativa.';
            case value > 40:
            return 'Atmosfera muito clara, ideal para observar paisagens e navegação.';
        }
    }
    public static humidity(value: number) {
        switch (true) {
            case value < 21:
                return 'Ar muito seco. Grande risco de fogo e problemas para respirar.';
            case value >= 21 && value <= 30:
                return 'Desconforto respiratório, pele seca e ressecamento de mucosas.';
            case value >= 31 && value <= 40:
                return 'Pode causar leve desconforto, especialmente para pessoas sensíveis.';
            case value >= 41 && value <= 60:
                return 'Faixa recomendada para o bem-estar. Conforto térmico e respiratório.';
            case value >= 61 && value <= 80:
                return 'Sensação de abafamento, aumento no risco de mofo e fungos.';
            case value >= 81:
                return 'Ambiente úmido, favorece mofo, bolor e sensação térmica elevada.';
        }
    }
    public static pressure(value: number) {
        switch (true) {
            case value < 1000:
                return 'Associada a tempo instável, chuvas, tempestades ou frentes frias.';
            case value >= 1000 && value <= 1012:
                return 'Possível variação no tempo. Transição entre sistemas de alta e baixa pressão.';
            case value === 1013:
                return 'Condições atmosféricas padrão ao nível do mar.';
            case value >= 1014 && value <= 1025:
                return 'Tempo geralmente estável, com poucas nuvens e menor chance de chuva.';
            case value > 1025:
                return 'Céu limpo, tempo firme e seco, associado a sistemas de alta pressão.';
        }
    }
    public static clouds(value: number) {
        switch (true) {
            case value < 11:
                return 'Céu claro, sem nuvens visíveis.';
            case value >= 11 && value <= 25:
                return 'Céu quase limpo, com poucas nuvens isoladas.';
            case value >= 26 && value <= 50:
                return 'Sol entre nuvens, com boa visibilidade.';
            case value >= 51 && value <= 70:
                return 'Céu com muitas nuvens, pouca presença de sol.';
            case value >= 71 && value <= 90:
                return 'Céu quase todo encoberto, raros momentos de sol.';
            case value >= 91:
                return 'Céu totalmente coberto por nuvens, sem abertura de sol.';
        }
    }
    public static wind(value: number) {
        switch (true) {
            case value < 6:
                return 'Vento fraco, quase imperceptível.';
            case value >= 6 && value <= 15:
                return 'Brisa suave, move folhas e papéis leves.';
            case value >= 16 && value <= 30:
                return 'Vento constante, balança galhos e causa leve desconforto.';
            case value >= 31 && value <= 50:
                return 'Vento forte, dificulta caminhar e levanta poeira.';
            case value >= 51 && value <= 75:
                return 'Ventania, pode causar quedas de galhos e objetos leves.';
            case value >= 76 && value <= 100:
                return 'Vento intenso, risco de danos e instabilidade em áreas abertas.';
            case value > 100:
                return 'Condição perigosa, com potencial para danos sérios.';
        }
    }
    public static weather(value: WeatherEnum) {
        switch (value) {
            case 'day_clear_sky':
            case 'night_clear_sky':
                return 'Céu limpo';
            case 'few_clouds':
                return 'Poucas nuvens';
            case 'day_scattered_clouds':
            case 'night_scattered_clouds':
                return 'Parcialmente nublado';
            case 'broken_clouds':
                return 'Predominantemente nublado';
            case 'mist':
            case 'night_mist':
                return 'Neblina';
            case 'shower_rain':
                return 'Chuva rápida';
            case 'rain':
            case 'night_rain':
                return 'Chuva moderada';
            case 'thunderstorm':
            case 'night_thunderstorm':
                return 'Tempestade';
            case 'snow':
                return 'Neve e tempo frio';
            default:
                return 'Condição climática não identificada';
        }
    }
    public static weatherDescription(value: WeatherEnum) {
        switch (value) {
            case 'day_clear_sky':
            case 'night_clear_sky':
                return 'Céu limpo durante todo o período, sem presença de nuvens. Condição ideal para atividades ao ar livre e excelente visibilidade.';
            case 'few_clouds':
                return 'Céu com poucas nuvens, permitindo boa incidência solar. Sensação de tempo aberto, com leves formações no horizonte.';
            case 'day_scattered_clouds':
            case 'night_scattered_clouds':
                return 'Céu parcialmente nublado, com momentos de sol entre nuvens. Boa luminosidade, embora com variações ao longo do dia.';
            case 'broken_clouds':
                return 'Céu predominantemente nublado, com cobertura significativa de nuvens. Raros períodos de abertura e pouca incidência solar.';
            case 'mist':
            case 'night_mist':
                return 'Presença de neblina, especialmente nas primeiras horas do dia ou à noite. Visibilidade reduzida e sensação de umidade no ar.';
            case 'shower_rain':
                return 'Chuva passageira e isolada, geralmente de curta duração. Pode ocorrer de forma repentina, seguida por períodos de tempo firme.';
            case 'rain':
            case 'night_rain':
                return 'Chuva contínua de intensidade moderada, podendo se prolongar ao longo do dia. Sensação térmica mais baixa e tempo fechado.';
            case 'thunderstorm':
            case 'night_thunderstorm':
                return 'Tempestade com raios e trovões, acompanhada de chuvas fortes e rajadas de vento. Requer atenção redobrada em áreas abertas.';
            case 'snow':
                return 'Precipitação de neve, com queda de flocos e possível acúmulo no solo. Condições frias e risco de escorregamento em vias e calçadas.';
            default:
                return 'Condição climática não reconhecida ou fora do padrão disponível.';
        }
    }
    public static feelsLike = 'Pode ser acentuada por vento, umidade e exposição solar.'
}