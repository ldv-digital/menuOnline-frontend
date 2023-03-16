import { Navigation } from '../components/Navigation'
import styles from './termsPrivacy.module.css'
import {Footer} from '../components/footer/index'

export default function Terms() {
  return (
    <>
      <Navigation />
      <div className={styles.privacy}>
        <h2>
          <span>1. Termos</span>
        </h2>
        <p>
          <span>
            Ao acessar ao site <a href="/">Menu Online</a>, concorda em cumprir
            estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e
            concorda que é responsável pelo cumprimento de todas as leis locais
            aplicáveis. Se você não concordar com algum desses termos, está
            proibido de usar ou acessar este site. Os materiais contidos neste
            site são protegidos pelas leis de direitos autorais e marcas
            comerciais aplicáveis.
          </span>
        </p>
        <h2>
          <span>2. Uso de Licença</span>
        </h2>
        <p>
          <span>
            É concedida permissão para baixar temporariamente uma cópia dos
            materiais 'informações ou software' no site Menu Online , apenas
            para visualização transitória pessoal e não comercial. Esta é a
            concessão de uma licença, não uma transferência de título e, sob
            esta licença, você não pode:
          </span>
        </p>
        <ol>
          <li>
            <span>modificar ou copiar os materiais;</span>
          </li>
          <li>
            <span>
              usar os materiais para qualquer finalidade comercial ou para
              exibição pública 'comercial ou não comercial';
            </span>
          </li>
          <li>
            <span>
              tentar descompilar ou fazer engenharia reversa de qualquer
              software contido no site Menu Online;
            </span>
          </li>
          <li>
            <span>
              remover quaisquer direitos autorais ou outras notações de
              propriedade dos materiais; ou
            </span>
          </li>
          <li>
            <span>
              transferir os materiais para outra pessoa ou 'espelhe' os
              materiais em qualquer outro servidor.
            </span>
          </li>
        </ol>
        <p>
          <span>
            Esta licença será automaticamente rescindida se você violar alguma
            dessas restrições e poderá ser rescindida por Menu Online a qualquer
            momento. Ao encerrar a visualização desses materiais ou após o
            término desta licença, você deve apagar todos os materiais baixados
            em sua posse, seja em formato eletrónico ou impresso.
          </span>
        </p>
        <h2>
          <span>3. Isenção de responsabilidade</span>
        </h2>
        <ol>
          <li>
            <span>
              Os materiais no site da Menu Online são fornecidos 'como estão'.
              Menu Online não oferece garantias, expressas ou implícitas, e, por
              este meio, isenta e nega todas as outras garantias, incluindo, sem
              limitação, garantias implícitas ou condições de comercialização,
              adequação a um fim específico ou não violação de propriedade
              intelectual ou outra violação de direitos.
            </span>
          </li>
          <li>
            <span>
              Além disso, o Menu Online não garante ou faz qualquer
              representação relativa à precisão, aos resultados prováveis ​​ou à
              confiabilidade do uso dos materiais em seu site ou de outra forma
              relacionado a esses materiais ou em sites vinculados a este site.
            </span>
          </li>
        </ol>
        <h2>
          <span>4. Limitações</span>
        </h2>
        <p>
          <span>
            Em nenhum caso o Menu Online ou seus fornecedores serão responsáveis
            ​​por quaisquer danos 'incluindo, sem limitação, danos por perda de
            dados ou lucro ou devido a interrupção dos negócios' decorrentes do
            uso ou da incapacidade de usar os materiais em Menu Online, mesmo
            que Menu Online ou um representante autorizado da Menu Online tenha
            sido notificado oralmente ou por escrito da possibilidade de tais
            danos. Como algumas jurisdições não permitem limitações em garantias
            implícitas, ou limitações de responsabilidade por danos conseqüentes
            ou incidentais, essas limitações podem não se aplicar a você.
          </span>
        </p>
        <h2>
          <span>5. Precisão dos materiais</span>
        </h2>
        <p>
          <span>
            Os materiais exibidos no site da Menu Online podem incluir erros
            técnicos, tipográficos ou fotográficos. Menu Online não garante que
            qualquer material em seu site seja preciso, completo ou atual. Menu
            Online pode fazer alterações nos materiais contidos em seu site a
            qualquer momento, sem aviso prévio. No entanto, Menu Online não se
            compromete a atualizar os materiais.
          </span>
        </p>
        <h2>
          <span>6. Links</span>
        </h2>
        <p>
          <span>
            O Menu Online não analisou todos os sites vinculados ao seu site e
            não é responsável pelo conteúdo de nenhum site vinculado. A inclusão
            de qualquer link não implica endosso por Menu Online do site. O uso
            de qualquer site vinculado é por conta e risco do usuário.
          </span>
        </p>

        <h3>
          <span>Modificações</span>
        </h3>
        <p>
          <span>
            O Menu Online pode revisar estes termos de serviço do site a
            qualquer momento, sem aviso prévio. Ao usar este site, você concorda
            em ficar vinculado à versão atual desses termos de serviço.
          </span>
        </p>
        <h3>
          <span>Lei aplicável</span>
        </h3>
        <p>
          <span>
            Estes termos e condições são regidos e interpretados de acordo com
            as leis do Menu Online e você se submete irrevogavelmente à
            jurisdição exclusiva dos tribunais naquele estado ou localidade.
          </span>
        </p>
      </div>
      <Footer />
    </>
  )
}
