<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;

use App\Repository\BookRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;


/**
 * @ApiResource(
 *  normalizationContext={"groups"={"book:read"}},
 *  denormalizationContext={"groups"={"book:write"}}
 * )
 * @ApiFilter(SearchFilter::class, properties={"title": "partial"})
 * @ApiFilter(PropertyFilter::class)
 * @ORM\Entity(repositoryClass=BookRepository::class)
 */
class Book
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"book:read", "book:write"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"book:read", "book:write"})
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=13)
     * @Groups({"book:read", "book:write"})
     */
    private $isbn;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"book:read", "book:write"})
     */
    private $pageCount;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({"book:read", "book:write"})
     */
    private $publishedDate;

    /**
     * @ORM\Column(type="string", length=255, nullable="true")
     * @Groups({"book:read", "book:write"})
     */
    private $thumbnailUrl;

    /**
     * @ORM\Column(type="text", nullable="true")
     * @Groups({"book:read", "book:write"})
     */
    private $shortDescription;

    /**
     * @ORM\Column(type="text", nullable="true")
     * @Groups({"book:read", "book:write"})
     */
    private $longDescription;

    /**
     * @ORM\Column(type="array")
     * @Groups({"book:read", "book:write"})
     */
    private $authors = [];

    /**
     * @ORM\Column(type="array")
     * @Groups({"book:read", "book:write"})
     */
    private $categories = [];

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Gedmo\Mapping\Annotation\Timestampable(on="create")
     * @Groups({"book:read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Gedmo\Mapping\Annotation\Timestampable(on="update")
     * @Groups({"book:read"})
     */
    private $updatedAt;

    //GETTERS

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function getIsbn(): ?string
    {
        return $this->isbn;
    }

    public function getPageCount(): ?int
    {
        return $this->pageCount;
    }

    public function getPublishedDate(): ?\DateTimeImmutable
    {
        return $this->publishedDate;
    }

    public function getThumbnailUrl(): ?string
    {
        return $this->thumbnailUrl;
    }

    public function getShortDescription(): ?string
    {
        return $this->shortDescription;
    }

    public function getLongDescription(): ?string
    {
        return $this->longDescription;
    }

    public function getAuthors(): ?array
    {
        return $this->authors;
    }

    public function getCategories(): ?array
    {
        return $this->categories;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    //SETTERS

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function setIsbn(string $isbn): self
    {
        $this->isbn = $isbn;

        return $this;
    }

    public function setPageCount(int $pageCount): self
    {
        $this->pageCount = $pageCount;

        return $this;
    }

    public function setPublishedDate(\DateTimeImmutable $publishedDate): self
    {
        $this->publishedDate = $publishedDate;

        return $this;
    }
       
    public function setThumbnailUrl(string $thumbnailUrl): self
    {
        $this->thumbnailUrl = $thumbnailUrl;

        return $this;
    }

    public function setShortDescription(string $shortDescription): self
    {
        $this->shortDescription = $shortDescription;

        return $this;
    }

    public function setLongDescription(string $longDescription): self
    {
        $this->longDescription = $longDescription;

        return $this;
    }

    public function setAuthors(array $authors): self
    {
        $this->authors = $authors;

        return $this;
    }

    public function setCategories(array $categories): self
    {
        $this->categories = $categories;

        return $this;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }


    public function setUpdatedAt(\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

}
