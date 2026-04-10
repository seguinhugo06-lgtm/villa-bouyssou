"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AnimatedText from "@/components/ui/AnimatedText";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function MentionsLegalesPage() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";
  return (
    <section className="min-h-screen bg-cream pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedText
            text="Mentions Legales"
            as="h1"
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-navy font-light"
          />
        </div>

        <div className="space-y-10">
          {/* Editeur du site */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <h2 className="font-heading text-2xl text-navy font-light mb-6">
                Editeur du site
              </h2>
              <div className="font-body text-charcoal/80 leading-relaxed space-y-2">
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
            </div>
          </AnimatedSection>

          {/* Hebergeur */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <h2 className="font-heading text-2xl text-navy font-light mb-6">
                Hebergeur
              </h2>
              <div className="font-body text-charcoal/80 leading-relaxed space-y-2">
                <p className="font-semibold text-charcoal">Vercel Inc.</p>
                <p>440 N Barranca Ave #4133</p>
                <p>Covina, CA 91723, Etats-Unis</p>
                <p className="pt-2">
                  Site web :{" "}
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-peach hover:underline"
                  >
                    vercel.com
                  </a>
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Propriete intellectuelle */}
          <AnimatedSection delay={0.3}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <h2 className="font-heading text-2xl text-navy font-light mb-6">
                Propriete intellectuelle
              </h2>
              <p className="font-body text-charcoal/80 leading-relaxed">
                L&apos;ensemble du contenu de ce site (textes, images,
                photographies, logos, icones, etc.) est la propriete exclusive de
                Villa Bouyssou ou de ses partenaires et est protege par les lois
                francaises et internationales relatives a la propriete
                intellectuelle. Toute reproduction, representation, modification,
                publication ou adaptation de tout ou partie des elements du site
                est interdite sans autorisation ecrite prealable.
              </p>
            </div>
          </AnimatedSection>

          {/* Responsabilite */}
          <AnimatedSection delay={0.4}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <h2 className="font-heading text-2xl text-navy font-light mb-6">
                Limitation de responsabilite
              </h2>
              <p className="font-body text-charcoal/80 leading-relaxed">
                Les informations contenues sur ce site sont aussi precises que
                possible et le site est periodiquement mis a jour, mais peut
                toutefois contenir des inexactitudes, des omissions ou des
                lacunes. Villa Bouyssou ne pourra etre tenue pour responsable des
                dommages directs ou indirects resultant de l&apos;acces ou de
                l&apos;utilisation du site, y compris l&apos;inaccessibilite, les
                pertes de donnees, les deteriorations ou les virus qui pourraient
                affecter l&apos;equipement informatique de l&apos;utilisateur.
              </p>
            </div>
          </AnimatedSection>

          {/* Protection des donnees */}
          <AnimatedSection delay={0.5}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <h2 className="font-heading text-2xl text-navy font-light mb-6">
                Protection des donnees personnelles (CNIL)
              </h2>
              <p className="font-body text-charcoal/80 leading-relaxed">
                Conformement a la loi n 78-17 du 6 janvier 1978 relative a
                l&apos;informatique, aux fichiers et aux libertes, et au
                Reglement General sur la Protection des Donnees (RGPD), vous
                disposez d&apos;un droit d&apos;acces, de rectification, de
                suppression et d&apos;opposition aux donnees personnelles vous
                concernant. Pour exercer ces droits, vous pouvez nous contacter a
                l&apos;adresse suivante :{" "}
                <a
                  href="mailto:lavillabouyssou@gmail.com"
                  className="text-peach hover:underline"
                >
                  lavillabouyssou@gmail.com
                </a>
                .
              </p>
            </div>
          </AnimatedSection>

          {/* Cookies */}
          <AnimatedSection delay={0.6}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <h2 className="font-heading text-2xl text-navy font-light mb-6">
                Cookies
              </h2>
              <p className="font-body text-charcoal/80 leading-relaxed">
                Ce site peut utiliser des cookies pour ameliorer
                l&apos;experience de navigation. Vous pouvez configurer votre
                navigateur pour refuser les cookies ou etre averti lorsqu&apos;un
                cookie est envoye. Pour plus d&apos;informations, consultez notre{" "}
                <Link
                  href={`/${locale}/politique-de-confidentialite`}
                  className="text-peach hover:underline"
                >
                  politique de confidentialite
                </Link>
                .
              </p>
            </div>
          </AnimatedSection>

          {/* Droit applicable */}
          <AnimatedSection delay={0.7}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <h2 className="font-heading text-2xl text-navy font-light mb-6">
                Droit applicable
              </h2>
              <p className="font-body text-charcoal/80 leading-relaxed">
                Les presentes mentions legales sont soumises au droit francais.
                En cas de litige, les tribunaux francais seront seuls competents.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
