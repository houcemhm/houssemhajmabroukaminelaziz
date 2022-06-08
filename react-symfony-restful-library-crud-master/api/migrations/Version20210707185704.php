<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210707185704 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE book ADD page_count INT NOT NULL, ADD published_date DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD thumbnail_url VARCHAR(255) NOT NULL, ADD short_description LONGTEXT NOT NULL, ADD long_description LONGTEXT NOT NULL, ADD categories LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE book DROP page_count, DROP published_date, DROP thumbnail_url, DROP short_description, DROP long_description, DROP categories');
    }
}
