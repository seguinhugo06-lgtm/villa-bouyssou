"use client";

import AnimatedText from "@/components/ui/AnimatedText";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function PolitiqueDeConfidentialitePage() {
  return (
    <section className="min-h-screen bg-cream pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedText
            text="Politique de Confidentialite"
            as="h1"
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-navy font-light"
          />
        </div>

        <div className="space-y-10">
          {/* Introduction */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <h2 className="font-heading text-2xl text-navy font-light mb-6">
                Introduction
              </h2>
              <p className="font-body text-charcoal/80 leading-relaxed">
                La Villa Bouyssou s&apos;engage a proteger la vie privee des
                utilisateurs de son site internet. La presente politique de
                confidentialite decrit les types de donnees personnelles que nous
                collectons, comment nous les utilisons, et les mesures que nous
                prenons pour les proteger, conformement au Reglement General sur
                la Protection des Donnees (RGPD).
              </p>
            </div>
          </AnimatedSection>

          {/* Collecte des donnees */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <h2 className="font-heading text-2xl text-navy font-light mb-6">
                Collecte des donnees
              </h2>
              <div className="font-body text-charcoal/80 leading-relaxed space-y-4">
                <p>
                  Nous collectons des donnees personnelles lorsque vous utilisez
                  notre site, notamment :
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>
                    <span className="font-semibold text-charcoal">
                      Formulaire de contact :
                    </span>{" "}
                    nom, prenom, adresse email, numero de telephone, dates de
                    sejour souhaitees, nombre d&apos;invites et commentaires.
                  </li>
                  <li>
                    <span className="font-semibold text-charcoal">
                      Demande de reservation :
                    </span>{" "}
                    les memes informations que le formulaire de contact, ainsi
                    que toute information supplementaire necessaire a la gestion
                    de votre reservation.
                  </li>
                  <li>
                    <span className="font-semibold text-charcoal">
                      Navigation sur le site :
                    </span>{" "}
                    donnees techniques telles que l&apos;adresse IP, le type de
                    navigateur, les pages visitees et la duree de la visite.
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>

          {/* Utilisation des donnees */}
          <AnimatedSection delay={0.3}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <h2 className="font-heading text-2xl text-navy font-light mb-6">
                Utilisation des donnees
              </h2>
              <div className="font-body text-charcoal/80 leading-relaxed space-y-4">
                <p>Les donnees collectees sont utilisees pour :</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>Repondre a vos demandes de contact et de reservation.</li>
                  <li>
                    Gerer et suivre les reservations de sejour a la Villa
                    Bouyssou.
                  </li>
                  <li>
                    Ameliorer le contenu et les fonctionnalites de notre site.
                  </li>
                  <li>
                    Respecter nos obligations legales et reglementaires.
                  </li>
                </ul>
                <p>
                  Vos donnees ne sont jamais vendues, louees ou partagees avec
                  des tiers a des fins commerciales.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Cookies */}
          <AnimatedSection delay={0.4}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <h2 className="font-heading text-2xl text-navy font-light mb-6">
                Cookies
              </h2>
              <div className="font-body text-charcoal/80 leading-relaxed space-y-4">
                <p>
                  Notre site peut utiliser des cookies pour ameliorer votre
                  experience de navigation. Les cookies sont de petits fichiers
                  texte stockes sur votre appareil. Nous utilisons :
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>
                    <span className="font-semibold text-charcoal">
                      Cookies essentiels :
                    </span>{" "}
                    necessaires au bon fonctionnement du site (preferences de
                    langue, session).
                  </li>
                  <li>
                    <span className="font-semibold text-charcoal">
                      Cookies analytiques :
                    </span>{" "}
                    pour comprendre comment les visiteurs utilisent le site et
                    ameliorer son contenu.
                  </li>
                </ul>
                <p>
                  Vous pouvez configurer votre navigateur pour refuser les
                  cookies ou etre informe lorsqu&apos;un cookie est envoye. La
                  desactivation des cookies peut affecter certaines
                  fonctionnalites du site.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Stockage et protection */}
          <AnimatedSection delay={0.5}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <h2 className="font-heading text-2xl text-navy font-light mb-6">
                Stockage et protection des donnees
              </h2>
              <div className="font-body text-charcoal/80 leading-relaxed space-y-4">
                <p>
                  Vos donnees personnelles sont stockees sur des serveurs
                  securises heberges par Vercel Inc. Nous mettons en oeuvre des
                  mesures de securite techniques et organisationnelles
                  appropriees pour proteger vos donnees contre tout acces non
                  autorise, modification, divulgation ou destruction.
                </p>
                <p>
                  Les donnees sont conservees uniquement pour la duree
                  necessaire aux finalites pour lesquelles elles ont ete
                  collectees, ou conformement aux obligations legales en vigueur.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Droits des utilisateurs (RGPD) */}
          <AnimatedSection delay={0.6}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <h2 className="font-heading text-2xl text-navy font-light mb-6">
                Vos droits (RGPD)
              </h2>
              <div className="font-body text-charcoal/80 leading-relaxed space-y-4">
                <p>
                  Conformement au RGPD, vous disposez des droits suivants
                  concernant vos donnees personnelles :
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>
                    <span className="font-semibold text-charcoal">
                      Droit d&apos;acces :
                    </span>{" "}
                    obtenir la confirmation que vos donnees sont traitees et en
                    recevoir une copie.
                  </li>
                  <li>
                    <span className="font-semibold text-charcoal">
                      Droit de rectification :
                    </span>{" "}
                    demander la correction de donnees inexactes ou incompletes.
                  </li>
                  <li>
                    <span className="font-semibold text-charcoal">
                      Droit a l&apos;effacement :
                    </span>{" "}
                    demander la suppression de vos donnees personnelles.
                  </li>
                  <li>
                    <span className="font-semibold text-charcoal">
                      Droit a la limitation du traitement :
                    </span>{" "}
                    restreindre le traitement de vos donnees dans certaines
                    circonstances.
                  </li>
                  <li>
                    <span className="font-semibold text-charcoal">
                      Droit a la portabilite :
                    </span>{" "}
                    recevoir vos donnees dans un format structure et lisible par
                    machine.
                  </li>
                  <li>
                    <span className="font-semibold text-charcoal">
                      Droit d&apos;opposition :
                    </span>{" "}
                    vous opposer au traitement de vos donnees pour des motifs
                    legitimes.
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact */}
          <AnimatedSection delay={0.7}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <h2 className="font-heading text-2xl text-navy font-light mb-6">
                Contact pour les demandes relatives aux donnees
              </h2>
              <div className="font-body text-charcoal/80 leading-relaxed space-y-2">
                <p>
                  Pour exercer vos droits ou pour toute question relative a la
                  protection de vos donnees personnelles, vous pouvez nous
                  contacter :
                </p>
                <div className="pt-4">
                  <p className="font-semibold text-charcoal">Villa Bouyssou</p>
                  <p>7 Route de la Verperie</p>
                  <p>24200 Sarlat-la-Caneda, France</p>
                  <p className="pt-2">
                    Email :{" "}
                    <a
                      href="mailto:lavillabouyssou@gmail.com"
                      className="text-peach hover:underline"
                    >
                      lavillabouyssou@gmail.com
                    </a>
                  </p>
                  <p>
                    Telephone :{" "}
                    <a
                      href="tel:+33687402093"
                      className="text-peach hover:underline"
                    >
                      +33 6 87 40 20 93
                    </a>
                  </p>
                </div>
                <p className="pt-4">
                  Vous disposez egalement du droit d&apos;introduire une
                  reclamation aupres de la Commission Nationale de
                  l&apos;Informatique et des Libertes (CNIL) :{" "}
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-peach hover:underline"
                  >
                    www.cnil.fr
                  </a>
                  .
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Mise a jour */}
          <AnimatedSection delay={0.8}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <h2 className="font-heading text-2xl text-navy font-light mb-6">
                Mise a jour de cette politique
              </h2>
              <p className="font-body text-charcoal/80 leading-relaxed">
                Cette politique de confidentialite peut etre mise a jour
                periodiquement. Nous vous invitons a la consulter regulierement
                pour rester informe de la maniere dont nous protegeons vos
                donnees. Derniere mise a jour : avril 2026.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
