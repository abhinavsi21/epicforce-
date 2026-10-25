import React from 'react';
import { ArrowUpRight, BookOpen, Compass, FileText, Sparkles } from 'lucide-react';
import { INNERVERSE_ARTICLES, InnerverseArticle } from '../config/articles';
import { trackEvent } from '../config/links';
import { FourFoundationsVisual } from './assets/FourFoundationsVisual';

export const InnerverseInsights: React.FC = () => {
  const featuredArticle = INNERVERSE_ARTICLES.find((a) => a.featured) || INNERVERSE_ARTICLES[0];
  const supportingArticles = INNERVERSE_ARTICLES.filter((a) => !a.featured);

  const handleArticleClick = (article: InnerverseArticle) => {
    trackEvent('article_click', {
      articleId: article.id,
      category: article.category,
      title: article.title,
    });
  };

  return (
    <section
      id="insights"
      className="relative py-24 sm:py-32 border-t border-white/10 bg-[#060814] overflow-hidden"
      aria-labelledby="insights-heading"
    >
      {/* Ambient background light gradients */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[#22D3EE] font-mono text-xs tracking-widest uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INNERVERSE / THOUGHT LEADERSHIP</span>
          </div>

          <h2
            id="insights-heading"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.1] mb-6"
          >
            Ideas for a More Intentional Life.
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-4">
            Explore the thinking behind Innerverse — from understanding the dimensions of personal
            growth to examining the relationship between intention, alignment, and meaningful action.
          </p>

          <p className="text-sm font-mono text-neutral-400 italic">
            Three perspectives. One question: are you navigating life in the direction that truly
            matters to you?
          </p>
        </div>

        {/* Curated Editorial Layout */}
        <div className="space-y-8">
          {/* 1. Featured Article Card — The Four Foundations and Seven Scores */}
          <article
            className="group relative rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-black/60 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 p-8 sm:p-12 shadow-2xl overflow-hidden"
            aria-label={`Featured Article: ${featuredArticle.title}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text Column */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[#22D3EE] font-mono text-xs uppercase tracking-wider">
                      {featuredArticle.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300 font-mono text-xs">
                      {featuredArticle.badge}
                    </span>
                    <span className="text-neutral-400 font-mono text-xs">
                      {featuredArticle.estimatedReadTime}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-snug mb-5 group-hover:text-cyan-200 transition-colors">
                    {featuredArticle.title}
                  </h3>

                  <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                    {featuredArticle.description}
                  </p>

                  {/* Editorial takeaway callout */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 mb-8 backdrop-blur-sm">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-cyan-400 mb-1">
                      Editorial Takeaway
                    </span>
                    <p className="font-display text-base sm:text-lg italic text-neutral-200">
                      “{featuredArticle.takeaway}”
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                  <span className="text-xs font-mono text-neutral-400">
                    {featuredArticle.metadata}
                  </span>

                  <a
                    href={featuredArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleArticleClick(featuredArticle)}
                    className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-white text-[#060814] hover:bg-neutral-200 font-medium text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-lg shadow-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    aria-label={`Read the Full Article: ${featuredArticle.title} (opens Google Doc in new tab)`}
                  >
                    <span>{featuredArticle.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              {/* Visual Column — Four Foundations of Life Artwork */}
              <div className="lg:col-span-5 flex items-center justify-center w-full">
                <FourFoundationsVisual className="w-full aspect-[3/4] max-w-[420px] lg:max-w-none shadow-2xl" />
              </div>
            </div>
          </article>

          {/* Supporting Articles Grid — Article 2 & Article 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supportingArticles.map((article) => {
              const isResearch = article.id === 'seven-score-research';

              return (
                <article
                  key={article.id}
                  className={`group relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden border ${
                    isResearch
                      ? 'bg-gradient-to-br from-neutral-900/70 via-black to-[#090D18] border-white/10 hover:border-blue-500/40'
                      : 'bg-gradient-to-br from-amber-950/20 via-neutral-900/60 to-black border-white/10 hover:border-amber-500/40'
                  }`}
                  aria-label={`${article.title}`}
                >
                  <div>
                    {/* Top Meta Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-md font-mono text-xs uppercase tracking-wider ${
                            isResearch
                              ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                              : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                          }`}
                        >
                          {article.category}
                        </span>
                        {article.badge && (
                          <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300 font-mono text-[11px]">
                            {article.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
                        {isResearch ? (
                          <FileText className="w-3.5 h-3.5 text-blue-400" />
                        ) : (
                          <Compass className="w-3.5 h-3.5 text-amber-400" />
                        )}
                        <span>{article.estimatedReadTime}</span>
                      </div>
                    </div>

                    {/* Article Title */}
                    <h3 className="font-display text-2xl sm:text-3xl text-white font-normal leading-snug mb-2 group-hover:text-cyan-200 transition-colors">
                      {article.title}
                    </h3>

                    {/* Subtitle / Author Credit */}
                    {article.subtitle && (
                      <p className="text-xs sm:text-sm font-mono text-neutral-400 mb-4">
                        {article.subtitle}
                      </p>
                    )}

                    {article.authorCredit && (
                      <p className="text-xs font-mono text-blue-400 mb-4">
                        Author: {article.authorCredit}
                      </p>
                    )}

                    {/* Description */}
                    <p className="text-neutral-300 text-sm font-light leading-relaxed mb-6">
                      {article.description}
                    </p>

                    {/* Editorial takeaway callout */}
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-6">
                      <span
                        className={`block font-mono text-[11px] uppercase tracking-wider mb-1 ${
                          isResearch ? 'text-blue-400' : 'text-amber-400'
                        }`}
                      >
                        Core Perspective
                      </span>
                      <p className="font-display text-sm sm:text-base italic text-neutral-200">
                        “{article.takeaway}”
                      </p>
                    </div>
                  </div>

                  {/* Card Footer / CTA */}
                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-xs font-mono text-neutral-400">
                      {article.metadata}
                    </span>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleArticleClick(article)}
                      className={`group/btn inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl text-xs font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                        isResearch
                          ? 'bg-blue-600/90 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                      }`}
                      aria-label={`${article.ctaText}: ${article.title} (opens in new tab)`}
                    >
                      <span>{article.ctaText}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Subtle publication footnote */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-400 gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Curated research and thought leadership from the Innerverse initiative.</span>
          </div>
          <span>EpicForce.ai Research & Framework Publications</span>
        </div>
      </div>
    </section>
  );
};
